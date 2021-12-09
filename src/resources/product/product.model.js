const { v4: uuid } = require('uuid');

class Product {
    constructor({
        id = uuid(),
        orderId = 'null',
        title = 'sofa',
        description = 'good'
        price = 100
    } = {}) {
        this.id = id;
        this.orderId = orderId;
        this.title = title;
        this.description = description;
        this.price = price;
    }

    static toResponse(product) {
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

module.exports = Product;