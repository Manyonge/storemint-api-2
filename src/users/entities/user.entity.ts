import { ProviderEnum, RoleEnum } from "../enums";

export class User {
  uid: number;
  email: string;

  phoneNumber: string;
  name: string;
  hash: string;
  role: RoleEnum;
  provider: ProviderEnum;
  createdAt: Date;
  updatedAt: Date;
}
