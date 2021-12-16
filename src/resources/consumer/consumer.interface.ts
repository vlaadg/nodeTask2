export interface IBaseConsumer {
    lastName: string;
    firstName: string;
    phoneNumber: string;
    address: string;
};

export interface IBaseConsumerPartial extends Partial<IBaseConsumer> { }

export interface IConsumer extends IBaseConsumer {
    id: string;
}

export interface IBaseConsumerResponse extends Partial<IBaseConsumer> {
    id: string;
}