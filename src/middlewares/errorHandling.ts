import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import fs from 'fs';
import path from 'path';
import stream from 'stream';
import util from 'util';

const pipeline = util.promisify(stream.pipeline);

export const errorHandling = async (
    error: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { name, message, stack } = error;
    const statusCode = name === 'Error' ? StatusCodes.NOT_FOUND : StatusCodes.INTERNAL_SERVER_ERROR;
    const logsFolder = path.join(__dirname, '../../logs');

    if (!fs.existsSync(logsFolder)) {
        fs.mkdirSync(logsFolder);
    }

    try {
        await pipeline(
            stream.Readable.from(`
      status code:     ${statusCode}
      errorName:       ${name}
      errorMessage:    ${message}
      errorStack:      ${stack}\n
      `),
            fs.createWriteStream(path.join(__dirname, '../../logs/errorHandling.log'), {
                flags: 'a',
            }),
        );
    } catch (er) {
        process.stderr.write(error.message);
        process.exit(1);
    }

    res.status(500).send('Internal server error');
    next();
};