import { Product } from "generated";

export class AllProductResponse{

    products: Product[];
}


export class ProductData{
    title: string;
    price: string;
    description: string;
    image: string;
}