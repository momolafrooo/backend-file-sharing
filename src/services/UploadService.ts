import bcrypt from "bcrypt";
import File from "../models/File";
import { v4 as uuidv4 } from "uuid";
import { CustomError } from "../errors/CustomError";

interface FileDto {
  name: string;
  content: string;
  password?: string;
}

export class UploadService {
  /**
   * uploads a file to the server
   */
  public static async upload(body: FileDto) {
    const data = {
      name: body.name,
      content: body.content,
      uuid: uuidv4(),
      password: body.password ? bcrypt.hashSync(body.password, 10) : null,
    };

    try {
      const file = await File.create(data);
      return {
        uuid: file.uuid,
        name: file.name,
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * downloads a file from the server
   */
  public static async download(uuid: string, password?: string) {
    const file = await File.findOne({ uuid });

    if (!file) {
      throw new CustomError("File not found", 404);
    }

    if (file.password && !password) {
      throw new CustomError("File is password protected", 401);
    }

    if (file.password && password && !bcrypt.compareSync(password, file.password)) {
      throw new CustomError("Invalid password", 401);
    }

    file.downloadCount++;
    await file.save();

    return {
      url: file.content,
      name: file.name,
    };
  }
}
