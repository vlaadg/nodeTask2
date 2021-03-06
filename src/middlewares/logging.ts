import { NextFunction, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import util from 'util';

import config from '../common/config';

const pipeline = util.promisify(stream.pipeline);

const { PORT } = config;

export const logging = async (req: Request, res: Response, next: NextFunction) => {
    const requestTime = new Date();
    const processTime = Date.now() - + requestTime;

    const logsFolder = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
    }

    try {
        await pipeline(
            stream.Readable.from(`
        request Time:     ${requestTime}
        method:           ${req.method}
        url:              ${`http://localhost:${PORT}${req.baseUrl + req.url}`}
        body:             ${JSON.stringify(req.body, null, '\t')}
        query:            ${JSON.stringify(req.query, null, '\t')}
        params:           ${JSON.stringify(req.params)}
        processing time:  ${processTime} ms
        status code:      ${res.statusCode}\n`),
            fs.createWriteStream(path.join(__dirname, '../../logs/logging.log'), { flags: 'a' }),
        );
    } catch (er) {
        process.stderr.write(`${console.error(er)}`);
        process.exit(1);
    }
    next();
};