const Consumer = require('./consumer.model')

const Consumers = [new Consumer()];

const getAll = async () => Consumers;

const getById = async (id) => Consumers.find((consumer) => consumer.id === id);

const createConsumer = async ({
  lastName,
  firstName,
  phoneNumber,
  address
}) => {
  const consumer = new Consumer({
    lastName,
    firstName,
    phoneNumber,
    address
  })
  Consumers.push(consumer);
  return consumer;
}

const updateById = async (id) => ({
  lastName,
  firstName,
  phoneNumber,
  address
}) => {
  const consumerPos = Consumers.findIndex((consumer) => consumer.id === id);
  if (consumerPos === -1) return null;

  const oldConsumer = Consumers[consumerPos];

  const newConsumer = {
    ...oldConsumer,
    lastName,
    firstName,
    phoneNumber,
    address
  };

  Consumers.splice(consumerPos, 1, newConsumer);
  return newConsumer;
};

const deleteById = async (id) => {
  const consumerPos = Consumers.findIndex((consumer) => consumer.id === id);

  if (consumerPos === -1) return null;

  const consumerDeletable = Consumers[consumerPos];

  Consumers.splice(consumerPos, 1);
  return consumerDeletable;
}

module.exports = {
  Consumers,
  getAll,
  getById,
  createConsumer,
  updateById,
  deleteById
};