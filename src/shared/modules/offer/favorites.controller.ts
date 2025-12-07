import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateObjectIdMiddleware
} from '../../libs/rest/index.js';
import { Component } from '../../types/index.js';
import { OfferService } from './offer-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDto } from '../../helpers/index.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { ParamOfferId } from './offerId.param.type.js';

@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController..');

    this.addRoute({
      path: '/',
      method: HttpMethod.GET,
      handler: this.index,
      middlewares: [
        new PrivateRouteMiddleware(),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.POST,
      handler: this.addToFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.removeFromFavorites,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offerService, 'Offer', 'offerId')
      ]
    });
  }

  public async index(
    { tokenPayload }: Request, res: Response
  ): Promise<void> {
    const offers = await this.offerService.findFavorite(tokenPayload.id);
    const responseData = fillDto(OfferShortRdo, offers);
    this.ok(res, responseData);
  }

  public async addToFavorites(
    { params, tokenPayload }: Request<ParamOfferId>, res: Response
  ): Promise<void> {
    await this.offerService.addToFavorite(tokenPayload.id, params.offerId);
    this.ok(res, { message: 'Offer added to favorites' });
  }

  public async removeFromFavorites(
    { params, tokenPayload }: Request<ParamOfferId>, res: Response
  ): Promise<void> {
    await this.offerService.removeFromFavorite(tokenPayload.id, params.offerId);
    this.ok(res, { message: 'Offer removed from favorites' });
  }
}
