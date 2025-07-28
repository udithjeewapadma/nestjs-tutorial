import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/config/prisma/prisma.service";

@Injectable()
export class UserService {
  constructor(private readonly DB: PrismaService) {}
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
