const {
    StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Product = require('../product/product.model');
const Order = require('./order.model');

const ordersService = require('./order.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const orders = await ordersService.getAll();

        res.json(orders.map(Order.toResponse));
    })
};

router.route(':/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const order = await ordersService.getById(id);

        if (order) {
            res.json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }
    })
);

router.route('/:id/products').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const orders = await ordersService.getProductsByOrderId(id);

        if (orders) {
            res.json(orders.map((ord) => Order.toResponse(ord)));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRODUCTS_NOT_FOUND',
                    msg: 'Products not found'
                });
        }
    })
);
router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            consumerId,
            date,
            deliveryTime
        } = req.body;

        const order = await ordersService.createOrder({
            consumerId,
            date,
            deliveryTime
        });

        if (order) {
            res.status(StatusCodes.CREATED).json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'ORDER_NOT_CREATED',
                    msg: 'Order not created'
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
            consumerId,
            date,
            deliveryTime
        } = req.body;

        const con = await ordersService.updateById({
            consumerId,
            date,
            deliveryTime
        });

        if (order) {
            res.status(StatusCodes.OK).json(Order.toResponse(order));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const order = await ordersService.deleteById(id);

        if (!order) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'ORDER_NOT_FOUND',
                    msg: 'Order not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'ORDER_DELETED',
                msg: 'The Order has been deleted'
            });
    })
);

module.exports = router;