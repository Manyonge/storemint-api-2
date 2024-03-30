import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { isStringWholeNumber } from "../helpers";

@Injectable()
export class CheckParamIdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (isStringWholeNumber(value)) {
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
