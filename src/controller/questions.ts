/**
 * the folling code is used to handle the questions generation
 * the questions are generated from the database by matching the request params with the subject fields
 */
import { Request, Response } from "express"
import { AppDataSource } from "../config/database.config"
import { QuestionModel } from "./../models/questions"
import { ServerError } from "../lib/error"
export class QuestionControllers {
  //fetch questions from the database
  static async getQuestions(req: Request, res: Response) {
    //get the subject from the request params
    const { subject } = req.params
    try {
      const questions = AppDataSource.getRepository(QuestionModel)
        .createQueryBuilder("question")
        .where("question.subject = :subject", { subject })
        .limit(50)
        .orderBy("RANDOM()")
        .getMany()
    } catch (error) {
      console.log(error)
      return res.send(ServerError("Something went wrong"))
    }
  }

  //add a question to the database
  static async addQuestion(req: Request, res: Response) {
    //get the subject from the request params
    const { subject, answer, option_a, option_b, option_c, option_d } = req.body
    try {
      const question = new QuestionModel()
      question.subject = subject
      question.question = answer
      question.option_a = option_a
      question.option_b = option_b
      question.option_c = option_c
      question.option_d = option_d
      question.date_added = new Date()
      await AppDataSource.getRepository(QuestionModel).save(question)
      return res.send({ success: true, message: "Question added successfully" })
    } catch (error) {
      console.log(error)
      return res.send(ServerError("Something went wrong"))
    }
  }
}
