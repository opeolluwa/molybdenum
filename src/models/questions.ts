/**
 * the questions model
 * the model will contain the following fields:
 * - question: the question
 * - answer: the answer
 * - option_a: the first option
 * - option_b: the second option
 * - option_c: the third option
 * - option_d: the fourth option
 * - subject: the subject of the question
 * - date_added: the date the question was added
 *
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("question")
export class QuestionModel {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined

  @Column({ type: "varchar", nullable: false })
  question: string | undefined

  @Column({ type: "varchar", nullable: false })
  subject: string | undefined

  @Column({ type: "varchar", nullable: false })
  option_a: string | undefined

  @Column({ type: "varchar", nullable: false })
  option_b: string | undefined

  @Column({ type: "varchar", nullable: false })
  option_c: string | undefined

  @Column({ type: "varchar", nullable: false })
  option_d: string | undefined

  @Column({ type: Date, nullable: false, default: () => "CURRENT_TIMESTAMP" })
  date_added: Date | undefined
}
