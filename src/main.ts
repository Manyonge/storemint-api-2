import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";
import * as express from "express";
import * as dotenv from "dotenv";

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.enableCors({
    credentials: true,
    origin: [
      "http://localhost:5173",
      "http://localhost:6000",
      "http://localhost:5174",
      "https://dripventory.storemint.shop",
      "https://staging1.storemint.shop",
      "https://storemint.shop",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  });
  app.use(cookieParser());
  app.use(express.json({ limit: "20mb" }));
  app.use(express.urlencoded({ limit: "20mb", extended: true }));
  const PORT = Number(process.env.PORT) || 9000;
  await app.listen(PORT);
}
bootstrap();
