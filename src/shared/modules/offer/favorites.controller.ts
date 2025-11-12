import { inject, injectable } from 'inversify';
import { BaseController, HttpError, HttpMethod } from '../../libs/rest/index.js';
import { Component } from '../../types/component.enum.js';
import { OfferService } from './offer-service.interface.js';
import { Logger } from '../../libs/logger/index.js';
import { Request, Response } from 'express';
import { fillDto } from '../../helpers/common.js';
import { OfferShortRdo } from './rdo/offer-short.rdo.js';
import { ParamOfferId } from './offerId.param.type.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class FavoritesController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for FavoritesController..');

    this.addRoute({path: '/', method: HttpMethod.GET, handler: this.index});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.POST,
      handler: this.addToFavorites as unknown as (req: Request, res: Response) => void
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.DELETE,
      handler: this.removeFromFavorites as unknown as (req: Request, res: Response) => void
    });
  }

  public async index(
    _req: Request, res: Response
  ): Promise<void> {
    // const offers = await this.offerService.findFavorite(userId);
    const offers = await this.findFavorites();
    const responseData = fillDto(OfferShortRdo, offers);
    this.ok(res, responseData);
  }

  private async findFavorites() {
    return [
      {
        id: 'dflpsdlf',
        title: 'fdldfsalfl',
      },
      {
        id: 'dflpsdlf',
        title: 'fdldfsalfl',
      }
    ];
  }

  public async addToFavorites(
    { params }: Request<ParamOfferId>,
    _res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'FavoritesController');
    }

    // await this.offerService.addToFavorite(userId, offerId);
    throw new Error('Not implemented');
  }

  public async removeFromFavorites(
    { params }: Request<ParamOfferId>,
    _res: Response
  ): Promise<void> {
    const {offerId} = params;
    const offer = await this.offerService.findById(offerId);
    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Offer not found', 'FavoritesController');
    }
    throw new Error('Not implemented');
  }
}
