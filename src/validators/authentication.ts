import * as EmailValidator from "email-validator"
import { Request, Response, NextFunction } from "express"
import { readdirSync } from "fs"
import {
  ConflictError,
  InvalidFormDataError,
  NotFoundError,
  AuthenticationError,
  ServerError,
} from "../lib/error"
import { generateErrorMessage } from "../lib/generate-error-message"
import { FileValidators } from "./files"
export class AuthValidators {
  static register(req: Request, res: Response, next: NextFunction) {
    const { email, password, firstname, lastname } = req.body
    const error: any = {}
    try {
      if (!email) {
        error.email = "Email is required"
      }
      if (!password) {
        error.password = "Password is required"
      }
      if (!firstname) {
        error.firstname = "Firstname is required"
      }
      if (!lastname) {
        error.lastname = "Lastname is required"
      }
      if (!EmailValidator.validate(email)) {
        error.email = "Email is invalid"
      }
      if (password && !(password.length >= 8)) {
        error.password = "please enter a longer password"
      }
      if (Object.keys(error).length > 0) {
        const errorMessage: string = generateErrorMessage(error)
        return res.send(InvalidFormDataError(errorMessage))
      }
      next()
    } catch (error: any) {
      console.log(error.message)
      return res.send(ServerError())
    }
  }
  //validate login payload
  static login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body
    if (!email || !password) {
      return res.send(InvalidFormDataError("email and password are required"))
    }
    next()
  }

  //validate user email during password reset
  static forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body
    if (!email || !EmailValidator.validate(email)) {
      return res.send(InvalidFormDataError("please provide a valid email"))
    }
    next()
  }

  //validate user password and confirm password during password change
  static resetPassword(req: Request, res: Response, next: NextFunction) {
    const { password, confirmPassword } = req.body
    const error: any = {}
    if (!password) {
      error.password = "Password is required"
    }
    if (!confirmPassword) {
      error.confirmPassword = "Confirm Password is required"
    }
    if (password !== confirmPassword) {
      error.confirmPassword = "Passwords do not match"
    }
    if (Object.keys(error).length > 0) {
      const errorMessage: string = generateErrorMessage(error)
      return res.send(InvalidFormDataError(errorMessage))
    }
    next()
  }
  //verify OTP for password change, OTP length should be 6
  static verifyOtp(req: Request, res: Response, next: NextFunction) {
    const { otp } = req.body
    if (!otp || otp.length !== 6) {
      return res.send(InvalidFormDataError("Invalid otp"))
    }
    next()
  }
}
