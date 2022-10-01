import { Application } from "express"
import { AuthenticationControllers } from "../controller/authentication"
import { AuthorizationMiddleware } from "../middleware/authorization"
import { AuthValidators as Validators } from "../validators/authentication"

export default (app: Application) => {
  app.post(
    "/auth/sign-up",
    Validators.register,
    AuthenticationControllers.signUp
  )
  app.get("/auth/confirm-email/:token", AuthenticationControllers.confirmEmail)
  app.post(
    "/auth/forgotten-password",
    Validators.forgotPassword,
    AuthenticationControllers.forgotPassword
  )
  app.post(
    "/auth/verify-otp",
    Validators.verifyOtp,
    AuthenticationControllers.verifyOtp
  )
  app.put(
    "/auth/set-new-password",
    Validators.resetPassword,
    AuthorizationMiddleware.verifyAuthToken,
    AuthenticationControllers.setNewPassword
  )
  app.post("/auth/login", Validators.login, AuthenticationControllers.login)
  app.get(
    "/auth/me",
    AuthorizationMiddleware.verifyAuthToken,
    AuthenticationControllers.getUserProfile
  )
  app.post("/auth/logout", AuthenticationControllers.logout)
}
