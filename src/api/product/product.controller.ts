import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
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
    console.log(typeof productId);
    return this.productService.getById(productId);
  }

  @Post('create-products')
  createProduct(@Body() newProduct: Iproduct){

    console.log(newProduct);
    const newProductId = this.productService.createProduct(newProduct);
    return `new product ${newProductId}`;

  }

  @Put('update-products/:id')
  updateProduct(@Param("id") productId: number, @Body() updateProduct: Iproduct){
    return this.productService.updateProduct(productId,updateProduct);
  }

  @Delete('delete-products/:id')
  deleteProduct(@Param("id") productId: number){
    return this.productService.deleteProduct(productId);
  }

}
