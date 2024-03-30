import {ProviderEnum, RoleEnum} from "../enums";
import {Timestamp} from "rxjs";
import { IsEmail, IsNotEmpty } from "class-validator";

export class User {
    uid: number;

    @IsEmail()
    email: string;

    phoneNumber: string;
    name: string;
    hash: string;
    role: RoleEnum;
    provider: ProviderEnum;
    createdAt: Date;
    updatedAt: Date
}
