import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const TOKEN_EXPIRATION_TIME = 24 * 60 * 60 // 24 hours
export class Jwt {
  static async encode(payload: any, time?: number): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const token = jwt.sign(payload, String(process.env.JWT_SECRET), {
          expiresIn: time || TOKEN_EXPIRATION_TIME,
        })
        resolve(token)
      } catch (error) {
        reject(error)
      }
    })
  }

  //return false for expired token or invalid token
  static async decode(token: string): Promise<any> {
    //check expiration time
    return new Promise((resolve, reject) => {
      try {
        const payload: any = jwt.verify(token, String(process.env.JWT_SECRET))
        const expiration = payload.exp * 1000 //from seconds to milliseconds
        const now = new Date().getTime() //UNIX time in seconds
        if (now >= expiration) {
          reject(false)
        }
        resolve(payload)
      } catch (error) {
        console.log(error)
        reject(false)
      }
    })
  }
}
