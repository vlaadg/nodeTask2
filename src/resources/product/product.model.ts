import {
    v4 as uuid
} from 'uuid';

import { IBaseProductPartial, IProduct } from './product.interface';

class Product {
    id: string;

    orderId: string | null;

    title: string;

    description: string;

    price: number;

    constructor({
        orderId = 'null',
        title = 'sofa',
        description = 'good',
        price = 100
    }: IBaseProductPartial = {}) {
        this.id = uuid();
        this.orderId = orderId;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    static toResponse(product: IProduct): IProduct {
        const {
            id,
            orderId,
            title,
            description,
            price
        } = product;
        return {
            id,
            orderId,
            title,
            description,
            price
        };
    }
}

export default Product;