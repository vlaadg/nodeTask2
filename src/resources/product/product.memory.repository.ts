import { IProduct, IBaseProduct } from './product.interface';
import Product from './product.model';

const PRODUCTS: IProduct[] = [new Product()]

const getAll = async (): Promise<IProduct[]> => PRODUCTS;

const getById = async (id: string): Promise<IProduct | null> => PRODUCTS.find((product) => product.id === id) || null;

const getProductsByOrderId = async (orderId: string): Promise<IProduct[] | null> => {
    const products = PRODUCTS.filter((product) => product.orderId === orderId);
    return products;
}

const createProduct = async ({
    orderId,
    title,
    description,
    price
}: IBaseProduct): Promise<IProduct> => {
    const product = new Product({
        orderId,
        title,
        description,
        price
    })
    PRODUCTS.push(product);
    return product;
}

const updateById = async ({
    id,
    orderId,
    title,
    description,
    price
}: IProduct): Promise<IProduct | null> => {
    const productPos = PRODUCTS.findIndex((product) => product.id === id);

    if (productPos === -1) return null;

    const oldProduct = PRODUCTS[productPos];

    const newProduct = {
        ...oldProduct,
        orderId,
        title,
        description,
        price,
        id
    };

    PRODUCTS.splice(productPos, 1, newProduct);
    return newProduct;

};

const deleteById = async (id: string): Promise<IProduct | null> => {
    const productPos = PRODUCTS.findIndex((product) => product.id === id);

    if (productPos === -1) return null;

    const productDeletable = PRODUCTS[productPos]!;

    PRODUCTS.splice(productPos, 1);
    return productDeletable;
}

const deleteByOrderId = async (orderId: string): Promise<void> => {
    const orders = PRODUCTS.filter((product) => product.orderId === orderId);

    await Promise.allSettled(orders.map(async (product) => deleteById(product.id)));
}

export default {
    PRODUCTS,
    getAll,
    getById,
    getProductsByOrderId,
    createProduct,
    updateById,
    deleteById,
    deleteByOrderId
}