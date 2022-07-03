/**
 * files model will be used to store the files uploaded by the user
 * the model will contain the following fields:
 * - file_name: the name of the file
 * - file_path: the url of the file
 * - date_added: the date the file was added
 * - user_id: the user id of the user who uploaded the file
 * - file_type: the type of the file {question, note, etc}
 * - file_size: the size of the file in megabytes
 * - file_extension: the extension of the file {jpg, png, pdf, doc, docx, xls, xlsx, csv, txt}
 * - file_description: the description of the file
 * - file_tags: the tags of the file
 * - file_category: the category of the file
 * 
 */
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
export class FileModel {
    @PrimaryGeneratedColumn("uuid")
    id: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_name: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_path: string | undefined;

    @Column({ type: Date, nullable: false, default: () => "CURRENT_TIMESTAMP" })
    date_added: Date | undefined;

    @Column({ type: "varchar", nullable: false })
    user_id: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_type: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_size: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_extension: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_description: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_tags: string | undefined;

    @Column({ type: "varchar", nullable: false })
    file_category: string | undefined;
}