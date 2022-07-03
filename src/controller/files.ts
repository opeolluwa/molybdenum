/**
 * the following controllers will be used to handle files download and upload
 * - -search for a file - the search will get all files that match the search query
 * - -download a file - the file will be downloaded to the user from the remote server
 * - -upload a file - the file will be uploaded to this server from the user, the information will be stored in the database then the file will be uploaded to the remote server
 * - -delete a file - only by an admin user - the file will be deleted from the database and the remote server
 * - -update a file - only by an admin user - the file will be updated in the database and the remote server
 * 
 */

import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../config/database.config";
import { FileModel } from "../models/files";
import { ServerError } from "../lib/error";
import { computeFileSize } from "../lib/compute-file-size";
import formidable from "formidable"

export class FileControllers {
    static async getFiles(req: Request, res: Response) {
        try {
            const files = await AppDataSource.getRepository(FileModel).find();
            return res.send(files);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }

    //search for files
    static async search(req: Request, res: Response) {
        try {
            const { query } = req.query;
            const files = await AppDataSource.getRepository(FileModel)
                .createQueryBuilder("file")
                .where("file.file_name like :query", { query: `%${query}%` })
                .getMany();
            return res.send(files);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }

    static async download(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = await AppDataSource.getRepository(FileModel).findOneBy({ id });
            if (!file) {
                return res.send(ServerError("File not found"));
            }
            return res.sendFile(file.file_path);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }

    //upload binary file to this server, store the info in the database, then upload the file to the remote server using AMQP
    static async upload(req: Request, res: Response, next: NextFunction) {
        try {
            const options = {
                uploadDir: './uploads',
                keepExtensions: true,
                maxFileSize: 100 * 1024 * 1024, //100MB
                fileName: "filename" + Date.now()
            }
            const form = formidable({ ...options });
            form.parse(req, async (err, fields: any, files: any) => {
                if (err) {
                    console.log("ERROR UPLOADING FILE", err);
                    return res.send(ServerError("Something went wrong"));
                }
                //destructure the fields
                const { file_name, file_description, file_tags } = fields;
                const { user_id } = req.app.get("user");
                const newFile = new FileModel();
                newFile.file_name = file_name;
                newFile.file_description = file_description;
                newFile.file_tags = file_tags;//tags are comma separated
                newFile.file_size = computeFileSize(files.uploaded.size);//im MB, or KB, or bytes
                newFile.file_type = files.file.type; //image/jpeg, image/png, etc
                newFile.file_path = files.file.path; //the remote path to the file
                newFile.user_id = user_id; //the user who uploaded the file
                await AppDataSource.getRepository(FileModel).save(newFile);
                return res.send({ success: true, message: "File uploaded successfully" });
                res.json({ fields, files });
            });
        } catch (error: any) {
            console.log(error.message);
            res.send(ServerError("Something went wrong"));
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = await AppDataSource.getRepository(FileModel).findOneBy({ id })
            if (!file) {
                return res.send(ServerError("File not found"));
            }
            await AppDataSource.getRepository(FileModel).remove(file);
            return res.send(file);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }


    static async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = await AppDataSource.getRepository(FileModel).findOneBy({ id });
            if (!file) {
                return res.send(ServerError("File not found"));
            }
            const { name, path, size, type } = req.body;
            file.file_name = name;
            file.file_path = path;
            file.file_size = size;
            file.file_type = type;
            await AppDataSource.getRepository(FileModel).save(file);
            return res.send(file);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }

    static async preview(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const file = await AppDataSource.getRepository(FileModel).findOneBy({ id });
            if (!file) {
                return res.send(ServerError("File not found"));
            }
            return res.sendFile(file.file_path);
        } catch (error) {
            console.log(error);
            return res.send(ServerError("Something went wrong"));
        }
    }
}