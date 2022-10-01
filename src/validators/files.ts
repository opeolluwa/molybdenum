import { AppDataSource } from "../config/database.config"
import { Request, Response, NextFunction } from "express"
import { generateErrorMessage } from "../lib/generate-error-message"
import { InvalidFormDataError } from "../lib/error"

export class FileValidators {
  static search(req: Request, res: Response, next: NextFunction) {
    const { query } = req.query
    if (!query) {
      return res.send(InvalidFormDataError("query is required"))
    }
    next()
  }

  static download(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    if (!id) {
      return res.send(InvalidFormDataError("id is required"))
    }
    next()
  }

  static upload(req: Request, res: Response, next: NextFunction) {
    /* const { file } = req.file
        if (!file) {
            return res.send(InvalidFormDataError("file is required"))
        } */
    next()
  }

  static delete(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    if (!id) {
      return res.send(InvalidFormDataError("id is required"))
    }
    next()
  }

  static update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    if (!id) {
      return res.send(InvalidFormDataError("id is required"))
    }
    next()
  }
}
