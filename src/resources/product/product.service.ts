import productsRepo from './product.memory.repository';

import { IBaseProduct, IProduct } from './product.interface';

const getAll = async (): Promise<IProduct[]> => productsRepo.getAll();

const getById = async (id: string): Promise<IProduct | null> => productsRepo.getById(id);

const createProduct = async (product: IBaseProduct): Promise<IProduct | null> => productsRepo.createProduct(product);

const updateById = async (product: IProduct): Promise<IProduct | null> => productsRepo.updateById(product);

const deleteById = async (id: string): Promise<IProduct | null> => {
    const productDeletable = await getById(id);
    productsRepo.deleteById(id);
    return productDeletable;
}
export default {
    getAll,
    getById,
    createProduct,
    updateById,
    deleteById
}