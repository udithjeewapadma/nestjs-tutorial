import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// interface IGetHello{
//   name: string;
//   age: number;
//   city: string;
// }

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // getHello(): IGetHello {
  //   return{
  //     name: 'Udith',
  //     age: 24,
  //     city: 'Gampaha',
  //   }
  // }
}
