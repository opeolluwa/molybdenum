import { Application } from "express";
import { FileValidators as Validators } from "./../validators/files";
import { FileControllers } from "../controller/files";

export default (app: Application) => {
    app.get("v2/files/search", Validators.search, FileControllers.search);
    app.get("v2/files/download/:id", FileControllers.download);
    app.post("v2/files/upload", Validators.upload, FileControllers.upload);
    app.delete("v2/files/delete/:id", FileControllers.delete);
    app.put("v2/files/update/:id", Validators.update, FileControllers.update);
}