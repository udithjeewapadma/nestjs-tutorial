import { ForbiddenException, HttpException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/decorator/roles/roles.decorator';

@Injectable()
export class JwtAuthService {
    constructor(private readonly jwt: JwtService){

    }

    async getToken(){
        try {
            const token = await this.jwt.signAsync({
                name: "udith",
                role: Role.User
            });
            return token;
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException(`Internal Server Error`);
        }
    }


    async verifyToken(token:string, roles?:Role[]):Promise<boolean>{
        try {
           const verify = await this.jwt.verifyAsync(token);
           if(roles){
            if(!roles.includes(verify?.role)){
                throw new ForbiddenException("You have no permissions")
            }
           }
           return verify as boolean;
        } catch (error) {
            console.log(error);
            if(error?.expiredAt) throw new UnauthorizedException('token expired');
            if(error instanceof HttpException) throw error; 
            throw new UnauthorizedException();
        }
    }
}
