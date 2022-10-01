import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class createAuthorizationTokenTable1664641142077
  implements MigrationInterface
{
    //create authorization token table
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
CREATE TABLE authorization_tokens (
  id varchar(36) NOT NULL,
  token text NOT NULL,
  lastValidDate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY id (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("authorization_tokens")
  }
}
