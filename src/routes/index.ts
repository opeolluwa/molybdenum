import { Application } from "express"
import AuthenticationRoutes from "./authentication"
import ErrorRoutes from "./error"


export default (app: Application) => {
    AuthenticationRoutes(app);
    ErrorRoutes(app)

}