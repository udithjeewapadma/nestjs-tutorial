import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductData } from './dto/product-response';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('all-products')
  allProducts() {
    return this.productService.getAllProducts();
  }

  @Get("get-by-id/:id")
  getProductById(@Param('id') id: string){
    return this.productService.getProductById(+id);
  }

  @Post('create-products')
  createProduct(@Body() newProduct: ProductData){

    console.log(newProduct);
    return this.productService.createProduct(newProduct);
  }

}
