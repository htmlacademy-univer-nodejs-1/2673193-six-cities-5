import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { OfferEntity } from './offer.entity.js';
import { inject, injectable } from 'inversify';
import { Component, City, SortType } from '../../types/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_FAVORITES_COUNT, DEFAULT_OFFER_COUNT, DEFAULT_PREMIUM_OFFER_COUNT } from './offer.constant.js';
import { CommentEntity } from '../comment/index.js';
import { FavoriteEntity } from './favorite.entity.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  private async setFavoriteFlags(offers: DocumentType<OfferEntity>[], userId?: string): Promise<DocumentType<OfferEntity>[]> {
    if (!userId) {
      return offers.map((offer) => {
        offer.isFavorite = false;
        return offer;
      });
    }

    const favorites = await this.favoriteModel.find({ userId }).exec();
    const favoriteOfferIds = new Set(favorites.map((fav) => fav.offerId.toString()));

    return offers.map((offer) => {
      offer.isFavorite = favoriteOfferIds.has(offer.id);
      return offer;
    });
  }

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);

    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const offer = await this.offerModel
      .findById(offerId)
      .populate(['authorId'])
      .exec();

    if (!offer) {
      return null;
    }

    if (!userId) {
      offer.isFavorite = false;
      return offer;
    }

    const favorite = await this.favoriteModel.findOne({ userId, offerId }).exec();
    offer.isFavorite = !!favorite;
    return offer;
  }

  public async find(userId?: string): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find()
      .populate(['authorId'])
      .exec();

    return this.setFavoriteFlags(offers, userId);
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['authorId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async findSorted(userId?: string, count?: number): Promise<DocumentType<OfferEntity>[]> {
    const offers = await this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count ?? DEFAULT_OFFER_COUNT)
      .populate(['autorId'])
      .exec();

    return this.setFavoriteFlags(offers, userId);
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {commentsCount: 1}})
      .exec();
  }

  public async findPremium(city: string, userId?: string): Promise<DocumentType<OfferEntity>[]> {
    if (!Object.values(City).includes(city as City)) {
      throw new Error(`Invalid city: ${city}`);
    }

    const offers = await this.offerModel
      .find({
        isPremium: true,
        city: city as City
      })
      .sort({ publicationDate: SortType.Down })
      .limit(DEFAULT_PREMIUM_OFFER_COUNT)
      .populate(['authorId'])
      .exec();

    return this.setFavoriteFlags(offers, userId);
  }

  public async findFavorite(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel.find({ userId }).exec();
    if (favorites.length === 0) {
      return [];
    }

    const offerIds = favorites.map((fav) => fav.offerId);
    const offers = await this.offerModel
      .find({
        _id: { $in: offerIds }
      })
      .limit(DEFAULT_FAVORITES_COUNT)
      .populate(['authorId'])
      .exec();

    return offers.map((offer) => {
      offer.isFavorite = true;
      return offer;
    });
  }

  public async addToFavorite(userId: string, offerId: string): Promise<void> {
    const offerExists = await this.exists(offerId);
    if (!offerExists) {
      throw new Error(`Offer with id ${offerId} not found`);
    }

    await this.favoriteModel
      .findOneAndUpdate(
        { userId, offerId },
        { userId, offerId },
        { upsert: true, new: true }
      )
      .exec();
  }

  public async removeFromFavorite(userId: string, offerId: string): Promise<void> {
    await this.favoriteModel
      .findOneAndDelete({ userId, offerId })
      .exec();
  }

  public async updateRating(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const comments = await this.commentModel
      .find({ offerId })
      .exec();

    if (comments.length === 0) {
      return this.offerModel
        .findByIdAndUpdate(offerId, { rating: 0 }, { new: true })
        .exec();
    }

    const totalRating = comments.reduce((sum, com) => sum + com.rating, 0);
    const finalRating = Math.round((totalRating / comments.length) * 10) / 10;

    return this.offerModel
      .findByIdAndUpdate(offerId, { rating: finalRating }, { new: true })
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId})) !== null;
  }
}
