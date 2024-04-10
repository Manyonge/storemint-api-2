import { Injectable, NestMiddleware } from "@nestjs/common";
import * as morgan from "morgan";

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    morgan(
      ":method :url :status :res[content-length] - :response-time ms [:date[clf]]",
    )(req, res, next);
  }
}
