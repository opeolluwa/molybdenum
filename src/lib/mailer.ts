/**
 * This library contains a function to get the email template for a given component.
 * This library shall be used for sending emails.
 * All rights reserved by Adeoye Adefemi <adefemiadeoye@yahoo.com> (C) 2022
 */

import nodemailer from "nodemailer"
import { Templates } from "./get-template"

type Options = {
  email: string // email address of the recipient
  subject: string // subject of the email
  template: string // template to be used, e.g. welcome, reset-password
  data?: object // data to be passed or parsed  to the template
}

export class Mailer {
  static async sendMail(options: Options) {
    try {
      const transporter = nodemailer.createTransport({
        // service: 'gmail',
        host: process.env.MAIL_HOST,
        // port: 465,
        // secure: true,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      })

      // send mail with defined transport object
      const template = await Templates.getTemplate(
        options.template,
        options.data
      )
      const message = {
        from: `Opeoluwa from sample project <${String(process.env.SMTP_USER)}>`,
        replyTo: process.env.SMTP_USER,
        to: options.email,
        subject: options.subject,
        html: String(template),
      }
      const info = await transporter.sendMail(message)
      return info
      console.log(info)
    } catch (error) {
      console.log(error)
      return error
    }
  }
}
