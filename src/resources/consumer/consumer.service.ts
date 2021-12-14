import consumersRepo from './consumer.memory.repository';
import ordersRepo from '../order/order.memory.repository';
import productsRepo from '../product/product.memory.repository';

import { IBaseConsumer, IConsumer } from './consumer.interface';
import { IOrder } from 'resources/order/order.interface';

const getAll = async (): Promise<IConsumer[]> => consumersRepo.getAll();

const getById = async (id: string): Promise<IConsumer | null> => consumersRepo.getById(id);

const getOrdersByConsumerId = async (id: string): Promise<IOrder[] | null> => ordersRepo.getOrdersByConsumerId(id);

const createConsumer = async (consumer: IBaseConsumer): Promise<IConsumer> => consumersRepo.createConsumer(consumer);

const updateById = async (consumer: IConsumer): Promise<IConsumer | null> => consumersRepo.updateById(consumer);

const deleteById = async (id: string): Promise<IConsumer | null> => {
    const consumerDeletable = await getById(id);
    await consumersRepo.deleteById(id);
    await ordersRepo.deleteByConsumerId(id);
    const order = ordersRepo.getOrdersByDelConsumerId(id)
    order.map((i) => productsRepo.deleteByOrderId(i.id))
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