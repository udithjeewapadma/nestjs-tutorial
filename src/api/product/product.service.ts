import { Injectable, InternalServerErrorException} from '@nestjs/common';
import { PrismaService } from 'src/config/prisma/prisma.service';

export interface Iproduct{
    title: string;
    price: number;
    description: string;
    image: string;
}
@Injectable()
export class ProductService {

    private products:Iproduct[] = [];


    constructor(private readonly DB:PrismaService ){}

    async getAllProducts() {
        try {  

            return await this.DB.product.findMany({
                select:{
                    title: true,
                    price: true,
                    image: true,
                    description: true
                },
            });

        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException("Product not found");
        }
    }

    async createProduct(product: Iproduct){

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
}
