import {
  v4 as uuid
} from 'uuid';

import { IConsumer, IBaseConsumerPartial, IBaseConsumerResponse } from './consumer.interface';

class Consumer {
  id: string;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  address: string;

  constructor({
    lastName = 'Ganisevskiy',
    firstName = 'Vlad',
    phoneNumber = '+375291234567',
    address = 'Stolbtsy'
  }: IBaseConsumerPartial = {}) {
    this.id = uuid();
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  static toResponse(consumer: IConsumer): IBaseConsumerResponse {
    const {
      id,
      lastName,
      firstName,
      phoneNumber,
      address
    } = consumer;
    return {
      id,
      lastName,
      firstName,
      phoneNumber,
      address
    };
  }
}

export default Consumer;