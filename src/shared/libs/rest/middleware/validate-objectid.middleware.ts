import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { StatusCodes } from 'http-status-codes';
import { HttpError } from '../errors/index.js';
import { Types } from 'mongoose';

export class ValidateObjectIdMiddleware implements Middleware {
  constructor(private param: string) {}

  execute({ params }: Request, _res: Response, next: NextFunction): void {
    const objectId = params[this.param];

    if (Types.ObjectId.isValid(objectId)) {
      return next();
    }

    throw new HttpError(StatusCodes.BAD_REQUEST,
      `${objectId} is invalid ObjectID`,
      'ValidateObjectIdMiddleware'
    );
  }
}
