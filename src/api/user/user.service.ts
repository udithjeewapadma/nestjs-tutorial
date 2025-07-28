import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/config/prisma/prisma.service";
import { LoginUserData } from "./dto/user-request.dto";

@Injectable()
export class UserService {
  constructor(private readonly DB: PrismaService) {}

  async login(userLoginData:LoginUserData){
    try {
      const user = await this.DB.user.findUnique({
        where:{
          username:userLoginData.username
        }
      })
      if(!user) throw new NotFoundException(`${userLoginData.username} not found`);
      if(userLoginData.password!==user.password) throw new BadRequestException(`password not matched`);
      return `${userLoginData.username} is successfully logged in`;
    } catch (error) {
      console.log(error);
      if(error instanceof HttpException) throw error;
      throw new InternalServerErrorException("Internal Server Error")
    }
  }



  async create(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.DB.user.create({
        data: createUserDto,
        select: {
          name: true,
          age: true,
          username: true,
          city: true,
          phone: true,
          email: true,
        },
      });
      return newUser;
    } catch (error) {
      console.log(error);
      if (error.code == "P2002")
        throw new BadRequestException(
          `${createUserDto.username} is already in use `
        );
      throw new InternalServerErrorException("Internal Server Error");
    }
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
