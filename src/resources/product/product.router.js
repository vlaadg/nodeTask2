const {
    StatusCodes
} = require('http-status-codes');
const router = require('express').Router();
const Product = require('./product.model');

const productsService = require('./product.service');
const catchErrors = require('../../common/catchErrors');

router.route('/').get(
    catchErrors(async (req, res) => {
        const products = await productsService.getAll();

        res.json(products.map(Order.toResponse));
    })
};

router.route(':/:id').get(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const product = await productsService.getById(id);

        if (product) {
            res.json(Order.toResponse(product));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRODUCT_NOT_FOUND',
                    msg: 'Product not found'
                });
        }
    })
);

router.route('/').post(
    catchErrors(async (req, res) => {
        const {
            orderId,
            title,
            description,
            price
        } = req.body;
        const product = await productsService.createProduct({
            orderId,
            title,
            description,
            price
        });

        if (product) {
            res.status(StatusCodes.CREATED).json(Product.toResponse(product));
        } else {
            res
                .status(StatusCodes.BAD_REQUEST)
                .json({
                    code: 'PRODUCT_NOT_CREATED',
                    msg: 'Product not created'
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
            orderId,
            title,
            description,
            price
        } = req.body;

        const product = await productsService.updateById({
            orderId,
            title,
            description,
            price
        });

        if (product) {
            res.status(StatusCodes.OK).json(Product.toResponse(proudct));
        } else {
            res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRODUCT_NOT_FOUND',
                    msg: 'Product not found'
                });
        }
    })
);

router.route('/:id').delete(
    catchErrors(async (req, res) => {
        const {
            id
        } = req.params;

        const product = await productsService.deleteById(id);

        if (!product) {
            return res
                .status(StatusCodes.NOT_FOUND)
                .json({
                    code: 'PRODUCT_NOT_FOUND',
                    msg: 'PRODUCT not found'
                });
        }

        return res
            .status(StatusCodes.NO_CONTENT)
            .json({
                code: 'PRODUCT_DELETED',
                msg: 'The Product has been deleted'
            });
    })
);

module.exports = router;