import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Iproduct, ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  allProducts(): Iproduct[] {
    return this.productService.getAllProducts();
  }

  @Get('by-id/:id')
  productById(@Param('id') productId: number ){
    console.log(productId);
    return this.productService.getById(productId);
  }

  @Post('create-products')
  createProduct(@Body() newProduct: Iproduct){

    console.log(newProduct);
    const newProductId = this.productService.createProduct(newProduct);
    return "new product ${newProductId}$";

  }

}
