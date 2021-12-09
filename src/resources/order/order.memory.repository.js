const Order = require('./order.model')
const productsRepo = require('../product/product.memory.repository');

const orderList = [new Order()];

const getAll = async () => orderList;

const getById = async (id) => orderList.find((order) => order.id === id);

const createOrder = async ({
    consumerId,
    date,
    deliveryTime
}) => {
    const order = new Order({
        consumerId,
        date,
        deliveryTime
    })
    orderList.push(order);
    return order;
}

const deleteById = async (id) => {
    const orderPos = orderList.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const orderDeletable = orderList[orderPos];

    orderList.splice(orderPos, 1);
    return orderDeletable;
}

const updateById = async =>({
    consumerId,
    date,
    deliveryTime
}) => {
    const orderPos = orderList.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const oldOrder = orderList[orderPos];

    const newOrder = {
        ...oldOrder,
        consumerId,
        date,
        deliveryTime
    };

    orderList.splice(orderPos, 1, newOrder);
    return newOrder;
}

const deleteByConsumerId = async (consumerId) => {
    const orders = orderList.filter((order) => order.consumerId === consumerId);

    await Promise.allSettled(orders.map(async (order) => {
        deleteById(order.id);
        productsRepo.deleteByOrderId(order.id);
    }))
}

const getOrderIdByConsumerId = async (consumerId) => {
    const orders = orderList.filter((order) => order.consumerId === consumerId)
    return orders;
}
module.exports = {
    orders,
    getAll,
    getById,
    createOrder,
    deleteById,
    updateById,
    deleteByConsumerId,
    getOrderIdByConsumerId
}