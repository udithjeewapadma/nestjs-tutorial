import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/config/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
