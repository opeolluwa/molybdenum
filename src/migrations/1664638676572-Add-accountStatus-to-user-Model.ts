import { MigrationInterface, QueryRunner } from "typeorm"

export class AddAccountStatusToUserModel1664638676572 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE user_information ADD COLUMN status ENUM ('active','unverified', 'verified', 'suspended', 'deactivated') DEFAULT 'unverified' ")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE user_information DROP COLUMN status")
    }

}
