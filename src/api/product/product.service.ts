import { HttpException, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AllProductResponse} from './dto/product-response';
import { ProductData, ProductUpdate } from './dto/product-request';

@Injectable()
export class ProductService {

    constructor(private readonly DB:PrismaService ){}

    async getAllProducts():Promise<AllProductResponse> {
        try {  

            const allProducts =  await this.DB.product.findMany();

            const newVar = {
                products: allProducts,
            };
            return newVar;

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Product not found");
        }
    }

    async getProductById(id:number):Promise<ProductData>{

        try {
            const product:unknown = await this.DB.product.findUnique({where: {id:+id}, select:{
                title: true,
                price: true,
                description: true,
                image: true,
            },
        });
        if(!product){
            throw new NotFoundException(`product ${id} not found`)
        }
        else{
            return product as ProductData;
        }
        } catch (error) {
            console.log(error);
            if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Internal Server Error")
        }
    }

    async createProduct(product: ProductData){

        try {
            const newData = await this.DB.product.create({
                data: product,
            });
            return newData;
            
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Database error");

            
        }

    }

    async updateProduct(id: number, product: ProductUpdate){
        try {
            await this.DB.product.update({
                 where:{id: +id},
                 data:{...product},
                });
                return `product ${id} is updated successfully`;
                
        } catch (error) {
            console.log(error);
            if(error instanceof HttpException) throw error;
            throw new InternalServerErrorException("Internal Server Error");
        }
    }
}
