import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractTokenFromHeader(request);
    if (!accessToken) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWT_SECRET,
      });
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  extractTokenFromHeader(request: Request): string | undefined {
    const authHeaders = request.headers["authorization"];
    if (authHeaders && authHeaders.startsWith("Bearer ")) {
      return authHeaders.slice("Bearer ".length);
    }
    return undefined;
  }
}
