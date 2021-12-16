import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';


import Consumer from './consumer.model';
import Order from '../order/order.model';

import consumersService from './consumer.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
  catchErrors(async (_req: Request, res: Response) => {
    const consumers = await consumersService.getAll();

    res.json(consumers.map(Consumer.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req: Request, res: Response) => {
    const {
      id
    } = req.params;

    const consumer = await consumersService.getById(id || '');

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
  catchErrors(async (req: Request, res: Response) => {
    const {
      id
    } = req.params;

    const orders = await consumersService.getOrdersByConsumerId(id || '');

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
  catchErrors(async (req: Request, res: Response) => {
    const {
      lastName,
      firstName,
      phoneNumber,
      address
    } = req.body;

    const consumer = await consumersService.createConsumer({
      lastName,
      firstName,
      phoneNumber,
      address
    });

    if (consumer) {
      res.status(StatusCodes.CREATED).json(Consumer.toResponse(consumer));
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

router.route('/:id').put(
  catchErrors(async (req: Request, res: Response) => {
    const {
      id
    } = req.params;
    const {
      lastName,
      firstName,
      phoneNumber,
      address
    } = req.body;

    const consumer = await consumersService.updateById({
      id: id || '',
      lastName,
      firstName,
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
  catchErrors(async (req: Request, res: Response) => {
    const {
      id
    } = req.params;

    const consumer = await consumersService.deleteById(id || '');

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

export default router;