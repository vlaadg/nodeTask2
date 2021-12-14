import { IBaseOrder, IOrder } from './order.interface';
import Order from './order.model';
import productsRepo from '../product/product.memory.repository';


const ORDERS: IOrder[] = [];

const getAll = async (): Promise<IOrder[]> => ORDERS;

const getById = async (id: string): Promise<IOrder | null> => ORDERS.find((order) => order.id === id) || null;

const getOrdersByConsumerId = async (consumerId: string): Promise<IOrder[] | null> => {
    const orders = ORDERS.filter((order) => order.consumerId === consumerId);
    return orders;
}

const getOrdersByDelConsumerId = (consumerId: string): IOrder[] => {
    const orders = ORDERS.filter((order) => order.consumerId === consumerId);
    return orders;
}

const createOrder = async ({
    consumerId,
    date,
    deliveryTime
}: IBaseOrder): Promise<IOrder> => {
    const order = new Order({
        consumerId,
        date,
        deliveryTime
    })
    ORDERS.push(order);
    return order;
}

const updateById = async ({
    id,
    consumerId,
    date,
    deliveryTime
}: IOrder): Promise<IOrder | null> => {
    const orderPos = ORDERS.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const oldOrder = ORDERS[orderPos];

    const newOrder = {
        ...oldOrder,
        consumerId,
        date,
        deliveryTime,
        id
    };

    ORDERS.splice(orderPos, 1, newOrder);
    return newOrder;
}

const deleteById = async (id: string): Promise<IOrder | null> => {
    const orderPos = ORDERS.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const orderDeletable = ORDERS[orderPos]!;

    ORDERS.splice(orderPos, 1);
    return orderDeletable;
}

const deleteByConsumerId = async (consumerId: string): Promise<void> => {
    const orders = ORDERS.filter((order) => order.consumerId === consumerId);

    await Promise.allSettled(orders.map(async (order) => {
        deleteById(order.id);
        productsRepo.deleteByOrderId(order.id);
    }))
}

export default {
    ORDERS,
    getAll,
    getById,
    getOrdersByConsumerId,
    getOrdersByDelConsumerId,
    createOrder,
    updateById,
    deleteById,
    deleteByConsumerId
}