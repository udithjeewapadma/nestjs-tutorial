import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Request} from 'express'
import { JwtAuthService } from 'src/config/jwt/jwt.service';
import { PUBLIC_DEC_KEY } from 'src/decorator/public/public.decorator';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private readonly JwtService: JwtAuthService,
    private readonly reflector: Reflector ){
  }
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{

    const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_DEC_KEY,[
      context.getHandler(),
      context.getClass()
    ]);

    if(isPublic) return true;


    const req:Request = context.switchToHttp().getRequest();
    const tokenstring = req.headers.authorization;
    console.log(tokenstring);

    const token =tokenstring?.split(' ')[1];
    if(!token) return false;
    return await this.JwtService.verifyToken(token);
  }
}
