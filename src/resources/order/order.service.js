const ordersRepo = require('./order.memory.repository');
const consumersRepo = require('../consumer/consumer.memory.repository');
const productsRepo = require('../product/product.memory.repository');

const getAll = () => ordersRepo.getAll();

const getById = (id) => ordersRepo.getById(id);

const createOrder = ({
    consumerId,
    date,
    deliveryTime
}) => ordersRepo.createOrder({
    consumerId,
    date,
    deliveryTime
});

const deleteById = async (id) => {
    const orderDeletable = await getById(id);
    ordersRepo.deleteById(id);
    productsRepo.deleteByOrderId(id);
    return orderDeletable;
}

const updateById = async (id) => ({
    consumerId,
    date,
    deliveryTime
}) => ordersRepo.updateById({
    consumerId,
    date,
    deliveryTime
});

const getProductIdByOrderId = (id) => productsRepo.getProductIdByOrderId(id);

module.exports = {
    getAll,
    getById,
    createOrder,
    deleteById,
    updateById,
    getProductIdByOrderId,
}