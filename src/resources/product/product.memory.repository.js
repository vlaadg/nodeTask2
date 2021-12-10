const Product = require('./product.model')

const Products = [new Product()]

const getAll = async () => Products;

const getById = async (id) => Products.find((product) => product.id === id);

const getProductsByOrderId = async (orderId) => {
    const products = Products.filter((product) => product.orderId === orderId);
    return products;
}

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
    Products.push(product)
    return product
}

const updateById = async ({
    orderId,
    title,
    description,
    price
}) => {
    const productPos = Products.findIndex((product) => product.id === id);

    if (productPos === -1) return null;

    const oldProduct = Products[productPos];

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

const deleteById = async (id) => {
    const productPos = Products.findIndex((product) => product.id === id);

    if (productPos === -1) return null;

    const productDeletable = Products[productPos];

    Products.splice(productPos, 1);
    return productDeletable;
}

const deleteByOrderId = async (orderId) => {
    const orders = Products.filter((product) => product.orderId === orderId);

    await Promise.allSettled(orders.map(async (product) => deleteById(product.id)));
}

module.exports = {
    Products,
    getAll,
    getById,
    getProductsByOrderId,
    createProduct,
    updateById,
    deleteById,
    deleteByOrderId
}