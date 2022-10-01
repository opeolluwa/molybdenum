import { MigrationInterface, QueryRunner, Table } from "typeorm"
//read more about typeorm migration here https://typeorm.io/migrations

export class CreateOtpModel1664621494161 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "one_time_passwords",
        columns: [
          {
            name: "id",
            type: "varchar(36)",
            isPrimary: true,
            isNullable: false,
          },
          {
            name: "otp", // the one time password itself
            type: "varchar(6)", //6 characters long
            isNullable: false,
          },
          {
            name: "isVerified", //see whether the otp has been used
            type: "boolean",
            default: false,
            isNullable: false,
          },
          {
            //expiration, unix timestamp of the <OTP expiration
            name: "expiration",
            type: "bigint",
            isNullable: false,
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //drop the one time password  table to the revert the operation
    await queryRunner.dropTable("one_time_passwords")
  }
}
