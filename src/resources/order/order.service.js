const ordersRepo = require('./order.memory.repository');
const productsRepo = require('../product/product.memory.repository');

const getAll = () => ordersRepo.getAll();

const getById = (id) => ordersRepo.getById(id);

const getProductsByOrderId = (id) => productsRepo.getProductsByOrderId(id);

const createOrder = ({
    id,
    consumerId,
    date,
    deliveryTime
}) => ordersRepo.createOrder({
    id,
    consumerId,
    date,
    deliveryTime
});

const updateById = async (id) => ({
    consumerId,
    date,
    deliveryTime
}) => ordersRepo.updateById({
    id,
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


module.exports = {
    getAll,
    getById,
    getProductsByOrderId,
    createOrder,
    updateById,
    deleteById
}