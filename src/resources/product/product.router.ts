import { StatusCodes } from 'http-status-codes';
import { Request, Response, Router } from 'express';


import Product from './product.model';

import productsService from './product.service';
import catchErrors from '../../common/catchErrors';

const router = Router();

router.route('/').get(
    catchErrors(async (_req: Request, res: Response) => {
        const products = await productsService.getAll();

        res.json(products.map(Product.toResponse));
    })
);

router.route('/:id').get(
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const product = await productsService.getById(id || '');

        if (product) {
            res.json(Product.toResponse(product));
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
    catchErrors(async (req: Request, res: Response) => {
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

router.route('/:id').put(
    catchErrors(async (req: Request, res: Response) => {
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
            id: id || '',
            orderId,
            title,
            description,
            price
        });

        if (product) {
            res.status(StatusCodes.OK).json(Product.toResponse(product));
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
    catchErrors(async (req: Request, res: Response) => {
        const {
            id
        } = req.params;

        const product = await productsService.deleteById(id || '');

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

export default router;