import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
export enum UserAccountStatus {
  UNVERIFIED = "unverified",
  VERIFIED = "verified",
}

@Entity("user_account")
export class UserModel {
  @PrimaryGeneratedColumn("uuid")
  id: string | undefined

  @Column({ type: "varchar" })
  firstname: string | undefined

  @Column({ type: "varchar" })
  lastname: string | undefined

  @Column({ type: "varchar" })
  email: string | undefined

  @Column({ type: "varchar", select: false })
  password: string | undefined

  @Column({
    type: "enum",
    enum: UserAccountStatus,
    default: UserAccountStatus.UNVERIFIED,
  })
  status: string | undefined

  @Column({ type: "varchar" })
  profilePicture: string | undefined

  @Column({ type: "varchar", default: "" })
  otpId!: string
}
