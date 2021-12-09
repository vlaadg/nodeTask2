const uuid = require('uuid');

class Consumer {
  constructor({
    id = uuid(),
    lastName = 'Ganisevskiy',
    firstName = 'Vlad',
    phoneNumber = '+375291234567',
    address = "Stolbtsy"
  } = {}) {
    this.id = id;
    this.lastName = lastName;
    this.firstName = firstName;
    this.phoneNumber = phoneNumber;
    this.address = address;
  }

  static toResponse(consumer) {
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

module.exports = Consumer;