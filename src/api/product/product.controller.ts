import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Iproduct, ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  allProducts() {
    return this.productService.getAllProducts();
  }

  @Post('create-products')
  createProduct(@Body() newProduct: Iproduct){

    console.log(newProduct);
    return this.productService.createProduct(newProduct);
  }

}
