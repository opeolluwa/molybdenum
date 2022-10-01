import { MigrationInterface, QueryRunner, Table } from "typeorm"
//read more about typeorm migration here https://typeorm.io/migrations
export class CreateUserModel1664614752948 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //create the user_information table
    await queryRunner.createTable(
      //the table definition
      new Table({
        //the table name will be "user_information in the database"
        name: "user_information",
        columns: [
          {
            name: "id",
            type: "varchar(36)", //uuid
            isPrimary: true, //set as primary key
            isNullable: false,
          },
          {
            //firstname
            name: "firstname",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            //lastname
            name: "lastname",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            //profile picture
            name: "avatar",
            type: "text", //text is used since the avatar url might be longer than 255 characters
            isNullable: true,
          },
          {
            //gender
            name: "gender",
            type: "enum",
            enum: ["male", "female", "others"],
            isNullable: true,
          },
          {
            //email
            name: "email",
            type: "varchar(255)",
            isUnique: true,
            isNullable: true,
          },
          {
            //phone number
            name: "phoneNumber",
            type: "varchar(36)", // saved with country code (+234 ... ...)
            isNullable: true,
          },
          {
            //password
            name: "password",
            type: "varchar(255)",
            isNullable: true,
          },
          {
            //for connection one time passwords to users
            name: "otpId",
            type: "varchar(36)",
            isNullable: true,
          },
        ],
      }),
      //create table if not exists ?
      true
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //drop the created table to revert the change
    await queryRunner.dropTable("user_information", true)
  }
}
