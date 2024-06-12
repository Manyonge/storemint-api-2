import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";

export const handleError = (e: any) => {
  console.log(e);
  if (e instanceof BadRequestException) {
    throw e;
  }
  throw new InternalServerErrorException("internal server error");
};
