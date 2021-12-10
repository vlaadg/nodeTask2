const {
  StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Consumer = require('./consumer.model');
const Order = require('../order/order.model');

const consumersService = require('./consumer.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
  catchErrors(async (req, res) => {
    const consumers = await consumersService.getAll();

    res.json(consumers.map(Consumer.toResponse));
  })
};

router.route(':/:id').get(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const consumer = await consumersService.getById(id);

    if (consumer) {
      res.json(Consumer.toResponse(consumer));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'CONSUMER_NOT_FOUND',
          msg: 'Consumer not found'
        });
    }
  })
);

router.route('/:id/orders').get(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const orders = await consumersService.getOrdersByConsumerId(id);

    if (orders) {
      res.json(orders.map((ord) => Order.toResponse(ord)));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'ODRED_NOT_FOUND',
          msg: 'Order not found'
        });
    }
  })
);
router.route('/').post(
  catchErrors(async (req, res) => {
    const {
      lastName,
      fristName,
      phoneNumber,
      address
    } = req.body;

    const consumer = await consumersService.createConsumer({
      lastName,
      fristName,
      phoneNumber,
      address
    });

    if (consumer) {
      res.status(StatusCodes.CREATED).json(Consumer.toResponse(menu));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          code: 'CONSUMER_NOT_CREATED',
          msg: 'Consumer not created'
        });
    }
  })
);

router.route(':/:id').put(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;
    const {
      lastName,
      fristName,
      phoneNumber,
      address
    } = req.body;

    const consumer = await consumersService.updateById({
      lastName,
      fristName,
      phoneNumber,
      address
    });

    if (consumer) {
      res.status(StatusCodes.OK).json(Consumer.toResponse(consumer));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'CONSUMER_NOT_FOUND',
          msg: 'Consumer not found'
        });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const {
      id
    } = req.params;

    const consumer = await consumersService.deleteById(id);

    if (!consumer) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({
          code: 'CONSUMER_NOT_FOUND',
          msg: 'CONSUMER not found'
        });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({
        code: 'CONSUMER_DELETED',
        msg: 'The consumer has been deleted'
      });
  })
);

module.exports = router;