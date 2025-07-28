import {PartialType} from '@nestjs/mapped-types';

export class ProductData{
    title: string;
    price: string;
    description: string;
    image: string;
}

export class ProductUpdate extends PartialType(ProductData){

}
