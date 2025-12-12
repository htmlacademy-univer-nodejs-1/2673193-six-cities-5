import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  HttpMethod,
  ValidateDtoMiddleware,
  PrivateRouteMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { CommentService } from './comment-service.interface.js';
import { Response } from 'express';
import { fillDto } from '../../helpers/common.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { OfferService } from '../offer/offer-service.interface.js';
import { StatusCodes } from 'http-status-codes';
import { CreateCommentRequest } from './types/create-comment-request.type.js';
import { CreateCommentDto } from './index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) protected readonly commentService: CommentService,
    @inject(Component.OfferService) protected readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController..');

    this.addRoute({
      path: '/',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateCommentDto)]
    });
  }

  public async create({ body, tokenPayload }: CreateCommentRequest, res: Response): Promise<void> {
    if (! await this.offerService.exists(body.offerId)) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${body.offerId} not found`,
        'CommentController'
      );
    }
    const comment = await this.commentService.create({ ...body, authorId: tokenPayload.id });
    await this.offerService.incCommentsCount(body.offerId);
    this.created(res, fillDto(CommentRdo, comment));
  }
}
