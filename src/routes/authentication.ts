import { Application } from "express"
import { AuthenticationControllers } from "../controller/authentication"
import { AuthorizationMiddleware } from "../middleware/authorization"
import { AuthValidators as Validators } from "../validators/authentication"

export default (app: Application) => {
  app.post(
    "/v2/auth/register",
    Validators.register,
    AuthenticationControllers.register
  )
  app.get(
    "/v2/auth/confirm-email/:token",
    AuthenticationControllers.confirmEmail
  )
  app.post(
    "/v2/auth/forgotten-password",
    Validators.forgotPassword,
    AuthenticationControllers.forgotPassword
  )
  app.post(
    "/v2/auth/verify-otp",
    Validators.verifyOtp,
    AuthenticationControllers.verifyOtp
  )
  app.put(
    "/v2/auth/set-new-password",
    Validators.resetPassword,
    AuthorizationMiddleware.verifyAuthToken,
    AuthenticationControllers.setNewPassword
  )
  app.post("/v2/auth/login", Validators.login, AuthenticationControllers.login)
  app.get(
    "/v2/auth/me",
    AuthorizationMiddleware.verifyAuthToken,
    AuthenticationControllers.getUserProfile
  )
  app.post("/v2/auth/logout", AuthenticationControllers.logout)
}
