export interface IBaseOrder {
    consumerId: string | null;
    date: string;
    deliveryTime: string;
}

export interface IOrder extends IBaseOrder {
    id: string;
}

export interface IBaseOrderResponse extends Partial<IBaseOrder> {
    id: string;
}

export interface IBaseOrderPartial extends Partial<IBaseOrder> { }
