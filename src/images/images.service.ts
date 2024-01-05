import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { v4 } from "uuid";
import { bucket } from "../firebase";
import * as dotenv from "dotenv";
import * as sharp from "sharp";
import * as path from "path";

dotenv.config();
@Injectable()
export class ImagesService {
  async uploadImage(folder: string, image: Express.Multer.File) {
    try {
      const timeStamp = Date.now();
      const randomId = v4();
      const originalName = path.parse(image.originalname).name;
      const fileName = `${timeStamp}-${randomId}-${originalName}.webp`;
      const filepath = `${folder}/${fileName}`;
      const file = bucket.file(filepath);
      const optimizedImage = sharp(image.buffer)
        .resize(800)
        .webp({ effort: 3 });
      await file.save(optimizedImage);
      await file.makePublic();
      return { publicUrl: file.publicUrl(), filepath };
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }

  async deleteByFilepath(filepath: string) {
    try {
      const response = await bucket.file(filepath).delete();
      console.log(response);
      return "ok";
    } catch (e: any) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
}
