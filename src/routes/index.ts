import express from "express";
import { UploadController } from "../controllers/UploadController";

export const router = express.Router();

/* GET home page. */
router.post("/upload", UploadController.upload);
router.post("/download", UploadController.download);
