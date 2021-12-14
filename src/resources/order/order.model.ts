import {
    v4 as uuid
} from 'uuid';

import { IOrder, IBaseOrderPartial, IBaseOrderResponse } from './order.interface';

class Order {
    id: string;
    consumerId: string | null;
    date: string;
    deliveryTime: string;
    constructor({
        consumerId = 'null',
        date = '24.05.2001',
        deliveryTime = '1 hour'
    }: IBaseOrderPartial = {}) {
        this.id = uuid();
        this.consumerId = consumerId;
        this.date = date;
        this.deliveryTime = deliveryTime;
    }

    static toResponse(order: IOrder): IBaseOrderResponse {
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

export default Order;