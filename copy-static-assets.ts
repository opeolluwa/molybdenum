import shelljs from "shelljs"
shelljs.cp("-R", "./src/templates/", "dist/templates")
shelljs.mkdir("-p", "./uploads")
