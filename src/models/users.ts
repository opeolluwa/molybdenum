import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"
export enum UserAccountStatus {
  UNVERIFIED = "unverified",
  VERIFIED = "verified",
  ACTIVE = "active",
  SUSPENDED = "suspended",
  DEACTIVATED = "deactivated"
}

@Entity("user_information")
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

  //the user profile picture
  @Column({ type: "varchar" })
  avatar: string | undefined

  @Column({ type: "varchar", default: "" })
  otpId!: string
}
