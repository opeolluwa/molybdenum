import { Request, Response, NextFunction } from "express"
import { InvalidFormDataError, AuthenticationError } from "../lib/error"
import { Jwt } from "../lib/jwt"
export type BadRequest = {
  email: string
  password: string
  firstname: string
  lastname: string
}
export class AuthorizationMiddleware {
  static register(req: Request, res: Response, next: NextFunction) {
    const { email, password, firstname, lastname } = req.body
    return email
  }

  //verify authorization header
  static async verifyAuthToken(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    //trim of excessive spacing  then split the header into header + token
    const authorizationHeader =
      req.headers["authorization"] ||
      req.headers["Authorization"] ||
      req.headers["Authorisation"]
    if (!authorizationHeader || typeof authorizationHeader === undefined) {
      return res.send(AuthenticationError("Invalid Authorization Header"))
    }
    const bearerToken: string =
      req.headers["authorization"]?.replace(/\s\s+/g, " ") ||
      String(req.headers["Authorization"]).replace(/\s\s+/g, " ")

    //else get the token from the header and validate it
    const [, token] = bearerToken.split(" ")
    const content = await Jwt.decode(token)
    // return res.send({ bearerToken, content })
    if (!content) {
      return res.send(AuthenticationError("Invalid Authorization Header"))
    }
    req.app.set("user", content)
    next()
  }
}
