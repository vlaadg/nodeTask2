const {
    v4: uuid
} = require('uuid');

class Order {
    constructor({
        id = uuid(),
        consumerId = '1f4604c3-132a-49e1-b346-78b77be6f6bb',
        date = '24.05.2001',
        deliveryTime = '1 hour'
    } = {}) {
        this.id = id;
        this.consumerId = consumerId;
        this.date = date;
        this.deliveryTime = deliveryTime;
    }

    static toResponse(order) {
        const {
            id,
            consumerId,
            date,
            deliveryTime
        } = order;
        return {
            id,
            consumerId,
            date,
            deliveryTime
        };
    }
}

module.exports = Order;