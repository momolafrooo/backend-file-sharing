import { Request, Response, NextFunction } from "express";
import { UploadService } from "../services/UploadService";

export class UploadController {
  /**
   * uploads a file to the server
   */
  public static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await UploadService.upload(req.body);
      res.status(200).json(file);
    } catch (error) {
      next(error);
    }
  }

  /**
   * downloads a file from the server
   */
  public static async download(req: Request, res: Response, next: NextFunction) {
    try {
      const file = await UploadService.download(req.body.uuid, req.body.password);
      res.status(200).json(file);
    } catch (error) {
      next(error);
    }
  }
}
