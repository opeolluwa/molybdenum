/**
 * the OTP model
 * the model will contain the following fields:
 * - otp: the otp
 * - user_id: the user id of the user who requested the otp
 * - date_added: the date the otp was requested
 * - otp_type: the type of the otp {login, forgot_password, etc}
 * - otp_status: the status of the otp {pending, verified, expired}
 * - otp_expiry: the expiry date of the otp
 * - otp_attempts: the number of attempts the otp has been used
 * - otp_attempts_expiry: the expiry date of the otp attempts
 *
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity("one_time_passwords")
export class Otp {
  @PrimaryGeneratedColumn("uuid")
  id!: string

  @Column({ type: "varchar" })
  otp: string | undefined

  @Column({ default: false })
  verified!: boolean

  @Column({ type: "bigint" })
  expiration!: number
}
