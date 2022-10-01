/**
 * This library contains a function to get the email template for a given component.
 * This library shall be used for generating otp to reset password and similar authentication services.
 * this library
 * All rights reserved by Adeoye Adefemi <adefemiadeoye@yahoo.com> (C) 2022
 */

import otpGenerator from "otp-generator"
import { Otp } from "../models/otp"
import { AppDataSource } from "../config/database.config"
export class OtpGenerator {
  static async generate(
    length = 6,
    options: any = { upperCaseAlphabets: false, specialChars: false }
  ): Promise<Otp> {
    //generate new otp and save it to database, return the otp id to the user controller that called the library
    return new Promise(async (resolve, reject) => {
      try {
        const otp = otpGenerator.generate(length, options)
        const otpObject = new Otp()
        otpObject.otp = otp
        otpObject.expiration = addMinutesToDate(10)
        await AppDataSource.manager.save(otpObject)
        resolve(otpObject)
      } catch (error) {
        reject(error)
      }
    })
  }

  //use to verify the token
  static async verify(otpId: string) {
    const otp = await AppDataSource.getRepository(Otp).findOneBy({ id: otpId })
    if (!otp) {
      return false
    }

    const now = new Date()
    const expiration = otp?.expiration
    const hasOtpExpired: boolean = now.getTime() >= Number(expiration)
    return hasOtpExpired // return true for expired otp
  }

  //invalidate the otp by setting the expiration to now
  static async invalidate(otpId: string) {
    const otp = await AppDataSource.getRepository(Otp).findOneBy({ id: otpId })
    if (!otp) {
      return false
    }
    otp.expiration = new Date().getTime()
    otp.verified = true
    await AppDataSource.manager.save(otp)
    return true
  }
}

//use this function to set the otp to expire after a certain time from the time of generation
export function addMinutesToDate(minutes: number): number {
  const now = new Date()
  const expiration: number = now.getTime() + minutes * 60000
  return expiration
}
