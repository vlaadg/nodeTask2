import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';

import config from '../common/config';

const { PORT } = config;

export const logging = async (req: Request, res: Response, next: NextFunction) => {
    const requestTime = new Date();
    const method = req.method;
    const url = `http://localhost:${PORT}${req.baseUrl + req.url}`;
    const body = JSON.stringify(req.body);
    const query = JSON.stringify(req.query);
    const params = JSON.stringify(req.params);
    const statusCode = res.statusCode;
    const processTime = Date.now() - + requestTime;

    const logsFolder = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
    }

    await pipeline(
        `
 Request:
     request Time:     ${requestTime}
     method:           ${method}
     url:              ${url}
     body:             ${body}
     query:            ${query}
     params:           ${params}
     processing time:  ${processTime} ms
 Response:
     status code:      ${statusCode}\n`,
        fs.createWriteStream(path.join(__dirname, '../../logs/logging.txt'), { flags: 'a' }),
        (error) => {
            if (error) {
                process.stderr.write(error.message);
                process.exit(1);
            }
        },
    );
    next();
};