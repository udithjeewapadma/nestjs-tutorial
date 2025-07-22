import { Injectable, NotFoundException } from '@nestjs/common';

export interface Iproduct{
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    rating: number;
}
@Injectable()
export class ProductService {

    private products:Iproduct[] = [];

    getAllProducts(): Iproduct[] {
        return this.products;
    }

    getById(id: number): Iproduct | null {
        let product: null | Iproduct = null;
        for (const productElement of this.products) {
            if(productElement.id === +id){
                product = productElement;
                break;
            }
        }
        if(product){
            return product;
        }else{
            throw new NotFoundException(`product ${id} not found`);
        }
        
    }

    // getById(id: number): Iproduct | null {
    //     return this.products.find(product => product.id === id) || null;
    //   }

    createProduct(product: Iproduct){
        this.products.push({...product, id:this.products.length + 1})
        return this.products.length;
    }
}
