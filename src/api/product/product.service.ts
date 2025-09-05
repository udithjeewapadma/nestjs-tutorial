import { BadRequestException, HttpException, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';
import { AllProductResponse} from './dto/product-response';
import { ProductData, ProductUpdate } from './dto/product-request';
// import { CACHE_MANAGER,Cache } from '@nestjs/cache-manager';

@Injectable()
export class ProductService {

    constructor(private readonly DB:PrismaService,
        //  @Inject(CACHE_MANAGER) private readonly cacheManager:Cache,
          ){}

    async getAllProducts():Promise<AllProductResponse> {
        // const cacheData = await this.cacheManager.get('all-products')
        // console.log(cacheData)
        try {  

            const allProducts =  await this.DB.product.findMany();

            const newVar = {
                products: allProducts,
            };
            // await this.cacheManager.set('all-products', newVar);
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
            // if(error instanceof HttpException) throw error;
            if(error['code'] == 'P2025') throw new BadRequestException(`product ${id} is not found`);
            throw new InternalServerErrorException("Internal Server Error");
        }
    }


    async deleteProduct(id: number): Promise<string>{
        try {
            await this.DB.product.delete({where:{id: +id}});
            return  `product ${id} is deleted successfully`;
            
        } catch (error) {
            console.log(error);
            if(error['code'] == 'P2025') throw new BadRequestException(`product ${id} is not found`);
            throw new InternalServerErrorException("Internal Server Error");

        }
    }
}
