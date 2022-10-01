//import all validators and merge them into one object
import { FileValidators } from "./files"
import { AuthValidators } from "./authentication"
import { QuestionValidators } from "./questions"

class Validators {}
Object.assign(Validators, FileValidators, AuthValidators, QuestionValidators)
console.log(Validators)
export default Validators
