const Product = require('./product.model')

const products = [new Product()]

const getAll = async () => products;

const getById = async (id) => products.find((product) => product.id === id);

const createProduct = async ({
    orderId,
    title,
    description,
    price
}) => {
    const product = new Product({
        orderId,
        title,
        description,
        price
    })
    products.push(product)
    return product
}

const deleteById = async (id) => {
    const productPos = products.findIndex((product) => product.id === id);

    if (productPos === -1) return null;

    const productDeletable = products[productPos];

    products.splice(productPos, 1);
    return productDeletable;
}

const deleteByOrderId = async (orderId) => {
    const orders = products.filter((product) => product.orderId === orderId);

    await Promise.allSettled(orders.map(async (product) => deleteById(product.id)))
}

const getProductIdByOrderId = async (orderId) => {
    const productss = products.filter((product) => product.orderId === orderId)
    return productss;
}
const updateById = async ({
    orderId,
    title,
    description,
    price
}) => {
    const productPos = products.findIndex((product) => proudct.id === id);

    if (productPos === -1) return null;

    const oldProduct = products[productPos]

    const newProduct = {
        ...oldProduct,
        orderId,
        title,
        description,
        price
    };

    products.splice(productPos, 1, newProduct);
    return newProduct;

};

module.exports = {
    products,
    getAll,
    getById,
    createProduct,
    deleteById,
    updateById,
    deleteByOrderId,
    getProductIdByOrderId
}