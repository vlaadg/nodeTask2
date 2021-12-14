import consumersRepo from './consumer.memory.repository';
import ordersRepo from '../order/order.memory.repository';
import productsRepo from '../product/product.memory.repository';

import { IBaseConsumer, IConsumer } from './consumer.interface';
import { IOrder } from 'resources/order/order.interface';

const getAll = (): Promise<IConsumer[]> => consumersRepo.getAll();

const getById = (id: string): Promise<IConsumer | null> => consumersRepo.getById(id);

const getOrdersByConsumerId = (id: string): Promise<IOrder[] | null> => ordersRepo.getOrdersByConsumerId(id);

const createConsumer = async (consumer: IBaseConsumer): Promise<IConsumer> => consumersRepo.createConsumer(consumer);

const updateById = async (consumer: IConsumer): Promise<IConsumer | null> => consumersRepo.updateById(consumer);

const deleteById = async (id: string): Promise<IConsumer | null> => {
    const consumerDeletable = await getById(id);
    consumersRepo.deleteById(id);
    ordersRepo.deleteByConsumerId(id);
    productsRepo.deleteByOrderId(ordersRepo.getOrdersByConsumerId(id));
    return consumerDeletable;
};

export default {
    getAll,
    getById,
    getOrdersByConsumerId,
    createConsumer,
    updateById,
    deleteById
};