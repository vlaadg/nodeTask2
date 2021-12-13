const productsRepo = require('./product.memory.repository');

const getAll = () => productsRepo.getAll();

const getById = (id) => productsRepo.getById(id);

const createProduct = ({
    id,
    orderId,
    title,
    description,
    price
}) => productsRepo.createProduct({
    id,
    orderId,
    title,
    description,
    price
});

const updateById = async (id) => ({
    orderId,
    title,
    description,
    price
}) => productsRepo.updateById({
    id,
    orderId,
    title,
    description,
    price
});

const deleteById = async (id) => {
    const productDeletable = await getById(id);
    productsRepo.deleteById(id);
    return productDeletable;
}

module.exports = {
    getAll,
    getById,
    createProduct,
    updateById,
    deleteById
}