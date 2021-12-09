const consumersRepo = require('./consumer.memory.repository');
const ordersRepo = require('../order/order.memory.repository');
const productsRepo = require('../product/product.memory.repository')

const getAll = () => consumersRepo.getAll();

const getById = (id) => consumersRepo.getById(id);

const createConsumer = ({
    lastName,
    firstName,
    phoneNumber,
    address
}) => consumersRepo.createConsumer({
    lastName,
    firstName,
    phoneNumber,
    address
});

const deleteById = async (id) => {
    const consumerDeletable = await getById(id);
    consumersRepo.deleteById(id);
    ordersRepo.deleteByConsumerId(id);
    dishesRepo.deleteByConsumerId(ordersRepo.getOrderIdByConsumerId(id));
    return consumerDeletable;
};

const updateById = ({
        id,
        lastName,
        firstName,
        phoneNumber,
        address
    }) =>
    consumersRepo.updateById({
        id,
        lastName,
        firstName,
        phoneNumber,
        address
    });

const getOrderIdByConsumerId = (id) =>
    ordersRepo.getOrderIdByConsumerId(id)

module.exports = {
    getAll,
    getById,
    createConsumer,
    deleteById,
    updateById,
    getOrderIdByConsumerId
};