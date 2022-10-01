/**
 * This library contains a function to get the email template for a given component.
 * It shall be heavily implemented in the send mail function.
 * All rights reserved by Adeoye Adefemi <adefemiadeoye@yahoo.com> (C) 2022
 */

import path from "path"
import ejs from "ejs"
import fs from "fs"

export class Templates {
  static async getTemplate(component: string, data: any) {
    const template = fs.readFileSync(
      `${__dirname}/../templates/${component}.ejs`,
      "utf8"
    )
    return ejs.render(template, data)
  }
}
