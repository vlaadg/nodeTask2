import { IBaseConsumer, IConsumer } from './consumer.interface';

import Consumer from './consumer.model';

const CONSUMERS: IConsumer[] = [new Consumer()];

const getAll = async (): Promise<IConsumer[]> => CONSUMERS;

const getById = async (id: string): Promise<IConsumer | null> => CONSUMERS.find((consumer) => consumer.id === id) || null;

const createConsumer = async ({
  lastName,
  firstName,
  phoneNumber,
  address
}: IBaseConsumer): Promise<IConsumer> => {
  const consumer = new Consumer({
    lastName,
    firstName,
    phoneNumber,
    address
  })
  CONSUMERS.push(consumer);
  return consumer;
}

const updateById = async ({
  id,
  lastName,
  firstName,
  phoneNumber,
  address
}: IConsumer): Promise<IConsumer | null> => {
  const consumerPos = CONSUMERS.findIndex((consumer) => consumer.id === id);

  if (consumerPos === -1) return null;

  const oldConsumer = CONSUMERS[consumerPos];

  const newConsumer = {
    ...oldConsumer,
    lastName,
    firstName,
    phoneNumber,
    address,
    id
  };

  CONSUMERS.splice(consumerPos, 1, newConsumer);
  return newConsumer;
};

const deleteById = async (id: string): Promise<IConsumer | null> => {
  const consumerPos = CONSUMERS.findIndex((consumer) => consumer.id === id);

  if (consumerPos === -1) return null;

  const consumerDeletable = CONSUMERS[consumerPos]!;

  CONSUMERS.splice(consumerPos, 1);
  return consumerDeletable;
}

export default {
  CONSUMERS,
  getAll,
  getById,
  createConsumer,
  updateById,
  deleteById
};