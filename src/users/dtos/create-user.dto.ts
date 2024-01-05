import {PickType} from "@nestjs/mapped-types";
import {User} from "../entities/user.entity";

export class CreateUserDto extends PickType(User, ['email', 'phoneNumber', 'name', "hash", "role", "provider"] as const){}