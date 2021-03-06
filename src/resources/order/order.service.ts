import { IProduct } from '../product/product.interface';
import ordersRepo from './order.memory.repository';
import productsRepo from '../product/product.memory.repository';

import { IBaseOrder, IOrder } from './order.interface';


const getAll = async (): Promise<IOrder[]> => ordersRepo.getAll();

const getById = async (id: string): Promise<IOrder | null> => ordersRepo.getById(id);

const getProductsByOrderId = async (id: string): Promise<IProduct[] | null> => productsRepo.getProductsByOrderId(id);

const createOrder = async (order: IBaseOrder): Promise<IOrder> => ordersRepo.createOrder(order);

const updateById = async (order: IOrder): Promise<IOrder | null> => ordersRepo.updateById(order);

const deleteById = async (id: string): Promise<IOrder | null> => {
    const orderDeletable = await getById(id);
    ordersRepo.deleteById(id);
    productsRepo.deleteByOrderId(id);
    return orderDeletable;
}


export default {
    getAll,
    getById,
    getProductsByOrderId,
    createOrder,
    updateById,
    deleteById
}