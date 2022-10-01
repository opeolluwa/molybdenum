import bcrypt from "bcrypt"
import { Request, Response } from "express"
import {
  ConflictError,
  InvalidFormDataError,
  NotFoundError,
  AuthenticationError,
  ServerError,
} from "../lib/error"
import { UserModel, UserAccountStatus } from "../models/users"
import { AppDataSource } from "../config/database.config"
import { Mailer } from "../lib/mailer"
import _ from "lodash"
import { OtpGenerator } from "../lib/otp-generator"
import { Jwt } from "../lib/jwt"

export class AuthenticationControllers {
  static async signUp(req: Request, res: Response) {
    const { email, password, firstname, lastname } = req.body

    //check if user already exists if not create a new user
    const user = await AppDataSource.getRepository(UserModel).findOneBy({
      email,
    })
    if (user) {
      return res.send(ConflictError("User already exists"))
    }
    try {
      const user = new UserModel()
      user.email = email
      user.password = await bcrypt.hash(password, 13)
      user.firstname = firstname
      user.lastname = lastname
      await AppDataSource.manager.save(user)
      const token = await Jwt.encode({ id: user.id, email: user.email })
      // send mail to user containing magic link to verify email address
      await Mailer.sendMail({
        email: email,
        subject: _.capitalize("Confirm your email address"),
        template: "confirm-email",
        data: {
          firstname: user.firstname,
          magicLink: `${process.env.FRONTEND_URL}/auth/confirm-email/${token}`,
        },
      })
      console.log(`${process.env.APP_URL}/auth/confirm-email/${token}`)
      return res.send({
        success: true,
        message:
          "User created successfully, please confirm your email to proceed",
        data: null,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  //to confirm the user's email address, verify the jwt sent to the user's email address and if it is valid, set the user's account to verified
  static async confirmEmail(req: Request, res: Response) {
    const { token } = req.params
    const decoded = await Jwt.decode(token)
    console.log(decoded)

    const { id, email } = decoded
    //if  token has not expired
    try {
      const user = await AppDataSource.getRepository(UserModel).findOneBy({
        id,
      })
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }
      if (user.email !== email) {
        return res.send(AuthenticationError("Invalid token"))
      }
      //update the user status to verified
      user.status = UserAccountStatus.VERIFIED
      await AppDataSource.manager.save(user)
      return res.send({ success: true, message: "Email verified successfully" })
    } catch (error) {
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  /**
   * -------------------------FORGOT PASSWORD------------------------
   * find the user by emaIL
   * if the user does not exist send off an error message else
   * generate a new otp and save it to the database using the otp data model
   * send a message to the user containing the otp
   */
  static async forgotPassword(req: Request, res: Response) {
    const { email } = req.body
    try {
      const user = await AppDataSource.getRepository(UserModel).findOneBy({
        email,
      })
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }

      /**
       * generate new otp and save it to the otp database,
       * save the otp id to the user's database, referencing the user that requested for reset
       * finally, send mail to user containing the otp
       */
      //save the otp id to the user's database, referencing the user that requested for reset
      const otpObject = await OtpGenerator.generate(6)
      console.log(otpObject)

      user.otpId = otpObject?.id
      AppDataSource.manager.save(user)
      //send the mail
      Mailer.sendMail({
        email: email,
        subject: _.capitalize("Reset your password"),
        template: "reset-password",
        data: { firstname: user.firstname, otp: otpObject?.otp },
      })
      //send feedback to client application the otp has been sent to the user's email
      return res.send({ success: true, message: "OTP sent to your email" })
    } catch (error: any) {
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  //confirm the otp and if it is valid, set the user's password to the new password
  static async verifyOtp(req: Request, res: Response) {
    const { email } = req.body
    try {
      const user = await AppDataSource.getRepository(UserModel).findOneBy({
        email,
      })
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }
      if (!user.otpId) {
        return res.send(NotFoundError("Invalid or used OTP"))
      }
      /**
       * confirm the otp and if it is valid,  then
       * invalidate the otp and send jwt containing user email and id to the client application,
       * the token will be used to authenticate the user for password reset where it will be passed as authorization header
       */
      const hasTokenExpired = await OtpGenerator.verify(user.otpId)
      if (hasTokenExpired) {
        return res.send(InvalidFormDataError("OTP has expired"))
      }
      //invalidate the otp
      const usedOtp = await OtpGenerator.invalidate(user.otpId)
      if (!usedOtp) {
        return res.send(ServerError("Error verifying  OTP"))
      }
      user.otpId = ""
      AppDataSource.manager.save(user)
      const payload = await Jwt.encode({ id: user.id, email: user.email })
      return res.send({
        success: true,
        message: "OTP verified",
        bearerToken: payload,
      })
    } catch (error) {
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  /**
   * to set new password for the user,
   * verify the jwt sent to the user's email address and if it is valid,
   * set the user's password to the new password
   */
  static async setNewPassword(req: Request, res: Response) {
    const { email } = req.app.get("user")
    const { password } = req.body
    const user = await AppDataSource.getRepository(UserModel).findOneBy({
      email,
    })

    if (!user) {
      return res.send(NotFoundError("User not found"))
    }
    try {
      //set new password
      user.password = await bcrypt.hash(password, 13)
      await AppDataSource.manager.save(user)
      return res.send({ success: true, message: "Password reset successfully" })
    } catch (error: any) {
      console.log(error.message)
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  /**
   * to login a user,
   * find the user by email and password
   * if the user does not exist send off an error message
   * else if the user is not verified send off an error message
   * else if the user is verified, send jwt containing user email and id to the client application,
   * the token will be used to authenticate where it will be passed as authorization header
   * afterward, the token will be invalidated and reset token will be generated every 10 minutes
   */
  static async login(req: Request, res: Response) {
    const { email, password } = req.body
    try {
      const user = await AppDataSource.getRepository(UserModel)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .addSelect("user.password")
        .getOne()
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }
      //validate account status
      if (user.status !== UserAccountStatus.VERIFIED) {
        return res.send(AuthenticationError("User not verified"))
      }
      //validate password
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.send(AuthenticationError("Invalid password"))
      }
      const payload = await Jwt.encode({ id: user.id, email: user.email })
      return res.send({
        success: true,
        message: "Login successful",
        bearerToken: payload,
      })
    } catch (error: any) {
      console.log(error.message)
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  //user profile
  static async getUserProfile(req: Request, res: Response) {
    const { email } = req.app.get("user")
    try {
      const user = await AppDataSource.getRepository(UserModel)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .addSelect("user.password")
        .getOne()
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }
      //build the payload
      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePicture: user.avatar,
      }
      return res.send({ success: true, message: "User profile", payload })
    } catch (error: any) {
      console.log(error.message)
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }

  /**
   * to logout a user,
   * invalidate the jwt sent to the user
   */
  static async logout(req: Request, res: Response) {}

  //generate refresh token
  static async generateRefreshToken(req: Request, res: Response) {
    const { email } = req.app.get("user")

    try {
      const user = await AppDataSource.getRepository(UserModel)
        .createQueryBuilder("user")
        .where("user.email = :email", { email })
        .addSelect("user.password")
        .getOne()
      if (!user) {
        return res.send(NotFoundError("User not found"))
      }
      //build the payload
      const payload = {
        id: user.id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        profilePicture: user.avatar,
      }
      return res.send({ success: true, message: "User profile", payload })
    } catch (error: any) {
      console.log(error.message)
      console.log(error.message)
      return res.status(500).send({
        success: false,
        message: (error as Error).message,
        data: null,
      })
    }
  }
}
