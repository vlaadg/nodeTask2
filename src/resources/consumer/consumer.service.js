const consumersRepo = require('./consumer.memory.repository');
const ordersRepo = require('../order/order.memory.repository');
const productsRepo = require('../product/product.memory.repository')

const getAll = () => consumersRepo.getAll();

const getById = (id) => consumersRepo.getById(id);

const getOrdersByConsumerId = (id) => ordersRepo.getOrdersByConsumerId(id);

const createConsumer = ({
    id,
    lastName,
    firstName,
    phoneNumber,
    address
}) => consumersRepo.createConsumer({
    id,
    lastName,
    firstName,
    phoneNumber,
    address
});

const updateById = async (id) => ({
    lastName,
    firstName,
    phoneNumber,
    address
}) => consumersRepo.updateById({
    lastName,
    firstName,
    phoneNumber,
    address
});

const deleteById = async (id) => {
    const consumerDeletable = await getById(id);
    consumersRepo.deleteById(id);
    ordersRepo.deleteByConsumerId(id);
    productsRepo.deleteByOrderId(ordersRepo.getOrdersByConsumerId(id));
    return consumerDeletable;
};





module.exports = {
    getAll,
    getById,
    getOrdersByConsumerId,
    createConsumer,
    updateById,
    deleteById
};