const Consumer = require('./consumer.model')

const consumers = [new Consumer()];

const getAll = async () => consumers;

const getById = async (id) => consumers.find((consumer) => consumer.id == id);

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
  consumers.push(consumer);
  return consumer;
}

const deleteById = async (id) => {
  const consumerPosition = consumers.findIndex((consumer) => consumer.id == id);

  if (consumerPosition === -1) return null;

  const consumerDeletable = consumers[consumerPosition];

  consumers.splice(consumerPosition, 1);
  return consumerDeletable;
}

const updateById = async ({
  lastName,
  firstName,
  phoneNumber,
  address
}) => {
  const consumerPosition = consumers.findIndex((consumer) => consumer.id == id);
  if (consumerPosition === -1) return null;

  const oldConsumer = consumers[consumerPosition];

  const newConsumer = {
    ...oldConsumer,
    lastName,
    firstName,
    phoneNumber,
    address
  };

  consumers.splice(consumerPosition, 1, newConsumer);
  return newMenu;
};

module.exports = {
  consumers,
  getAll,
  getById,
  createConsumer,
  deleteById,
  updateById
};