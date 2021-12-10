const Order = require('./order.model')
const productsRepo = require('../product/product.memory.repository');

const Orders = [new Order()];

const getAll = async () => Orders;

const getById = async (id) => Orders.find((order) => order.id === id);

const getOrdersByConsumerId = async (consumerId) => {
    const orders = Orders.filter((order) => order.consumerId === consumerId);
    return orders;
}

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
    Orders.push(order);
    return order;
}

const updateById = async =>({
    consumerId,
    date,
    deliveryTime
}) => {
    const orderPos = Orders.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const oldOrder = Orders[orderPos];

    const newOrder = {
        ...oldOrder,
        consumerId,
        date,
        deliveryTime
    };

    Orders.splice(orderPos, 1, newOrder);
    return newOrder;
}

const deleteById = async (id) => {
    const orderPos = Orders.findIndex((order) => order.id === id);

    if (orderPos === -1) return null;

    const orderDeletable = Orders[orderPos];

    Orders.splice(orderPos, 1);
    return orderDeletable;
}

const deleteByConsumerId = async (consumerId) => {
    const orders = Orders.filter((order) => order.consumerId === consumerId);

    await Promise.allSettled(orders.map(async (order) => {
        deleteById(order.id);
        productsRepo.deleteByOrderId(order.id);
    }))
}

module.exports = {
    Orders,
    getAll,
    getById,
    getOrdersByConsumerId,
    createOrder,
    updateById,
    deleteById,
    deleteByConsumerId
}