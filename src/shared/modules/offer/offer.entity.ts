import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { AmenityType, City, Coordinates, OfferType } from '../../types/index.js';
import { UserEntity } from '../user/user.entity.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title: string;

  @prop({trim: true, required: true})
  public description: string;

  @prop({required: true})
  public publicationDate: Date;

  @prop({
    type: () => String,
    enum: City,
    required: true
  })
  public city: City;

  @prop({required: true})
  public previewImage: string;

  @prop({
    required: true,
    type: () => [String]
  })
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public rating: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public type: OfferType;

  @prop({required: true})
  public bedrooms: number;

  @prop({required: true})
  public maxGuests: number;

  @prop({required: true})
  public price: number;

  @prop({
    required: true,
    type: () => [String]
  })
  public amenities: AmenityType[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public authorId: Ref<UserEntity>;

  @prop({default: 0})
  public commentsCount: number;

  @prop({
    required: true,
    type: () => [Number]
  })
  public coordinates: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
