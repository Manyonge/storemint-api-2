import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class CheckParamIdPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    try {
      const isNumber =
        typeof Number(value) === "number" && !isNaN(Number(value));
      const isGreaterThan0 = Number(value) > 0;
      const isWholeNumber = Number.isInteger(value) || value % 1 === 0;

      if (isNumber && isGreaterThan0 && isWholeNumber) {
        return value;
      } else {
        throw new BadRequestException([
          "id must be a number",
          "id must be a number greater than 0",
          "id must be a whole number",
        ]);
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
