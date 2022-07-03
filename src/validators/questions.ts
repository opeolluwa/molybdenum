import { Request, Response, NextFunction } from "express"
import { generateErrorMessage } from "./../lib/generate-error-message";
import { InvalidFormDataError, NotFoundError, AuthenticationError, ServerError } from "../lib/error";

export class QuestionValidators {
    static addQuestion(req: Request, res: Response, next: NextFunction) {
        const { question, answer } = req.body
        const error: any = {}
        if (!question) {
            error.question = "Question is required"
        }
        if (!answer) {
            error.answer = "Answer is required"
        }
        if (Object.keys(error).length > 0) {
            const errorMessage: string = generateErrorMessage(error);
            return res.send(InvalidFormDataError(errorMessage));
        }
        next()
    }
}