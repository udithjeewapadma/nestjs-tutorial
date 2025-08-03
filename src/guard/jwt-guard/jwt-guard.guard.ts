import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {Request} from 'express'
import { JwtAuthService } from 'src/config/jwt/jwt.service';

@Injectable()
export class JwtGuardGuard implements CanActivate {

  constructor(private readonly JwtService: JwtAuthService){
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    const req:Request = context.switchToHttp().getRequest();
    const tokenstring = req.headers.authorization;
    console.log(tokenstring);

    const token =tokenstring?.split(' ')[1];
    if(!token) return false;
    return await this.JwtService.verifyToken(token);
  }
}
