export interface IBaseProduct {
    orderId: string | null;
    title: string;
    description: string;
    price: number;
}

export interface IProduct extends IBaseProduct {
    id: string;
}

export interface IBaseProductPartial extends Partial<IBaseProduct> {
}