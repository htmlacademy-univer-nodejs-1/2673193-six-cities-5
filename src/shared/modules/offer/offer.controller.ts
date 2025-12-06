import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpMethod,
  ValidateObjectIdMiddleware,
  ValidateDtoMiddleware,
  DocumentExistsMiddleware,
} from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { OfferService } from './offer-service.interface.js';
import { OfferRdo } from './rdo/offer.rdo.js';
import { fillDto } from '../../helpers/index.js';
import { CreateOfferDto, UpdateOfferDto } from './dto/index.js';
import { ParamOfferId } from './offerId.param.type.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { ParamCity } from './city.param.type.js';
import { CommentRdo, CommentService } from '../comment/index.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CommentService) private readonly commentService: CommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController..');

    this.addRoute({ path: '/', method: HttpMethod.GET, handler: this.index });
    this.addRoute({
      path: '/',
      method: HttpMethod.POST,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.GET,
      handler: this.show,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.PATCH,
      handler: this.update,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
    this.addRoute({ path: '/premium/:city', method: HttpMethod.GET, handler: this.getPremium});
    this.addRoute({
      path: '/:offerId/comments',
      method: HttpMethod.GET,
      handler: this.getComments,
      middlewares: [new ValidateObjectIdMiddleware('offerId'), new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')]
    });
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDto(OfferShortRdo, offers);
    this.ok(res, responseData);
  }

  public async create(
    { body }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDto(OfferRdo, result));
  }

  public async show(
    { params }: Request<ParamOfferId>,
    res: Response
  ): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async update(
    { params, body }: Request<ParamOfferId, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offerService.updateById(params.offerId, body);
    this.ok(res, fillDto(OfferRdo, result));
  }

  public async delete(
    { params }: Request<ParamOfferId>, res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offerService.deleteById(offerId);
    await this.commentService.deleteByOfferId(offerId);
    this.noContent(res, offer);
  }

  public async getPremium(
    { params }: Request<ParamCity>,
    res: Response
  ): Promise<void> {
    const { city } = params;
    this.logger.info(`Getting premium offers for city: ${city}`);
    const offers = await this.offerService.findPremium(city);
    const responseData = fillDto(OfferShortRdo, offers);
    this.ok(res, responseData);
  }

  public async getComments({ params }: Request<ParamOfferId>, res: Response): Promise<void> {
    const comments = await this.commentService.findByOfferId(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }
}
