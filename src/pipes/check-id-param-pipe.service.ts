import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isWholeNumber } from "../helpers";

@Injectable()
export class CheckIdParamPipe implements PipeTransform {
  async transform(value: any) {
    try {
      if (isWholeNumber(value)) {
        return value;
      } else {
        throw new BadRequestException(
          "id must be a whole number greater than 0",
        );
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
