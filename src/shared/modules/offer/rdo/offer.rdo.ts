import { Expose, Type } from 'class-transformer';
import { AmenityType, OfferType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';
import { CoordinatesRdo } from './coordinates.rdo.js';

export class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public description!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

  @Expose()
  public images!: string[];

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public isFavorite!: boolean;

  @Expose()
  public rating!: number;

  @Expose()
  public type!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public bedrooms!: number;

  @Expose()
  public maxGuests!: number;

  @Expose()
  public amenities!: AmenityType[];

  @Expose()
  @Type(() => UserRdo)
  public author!: UserRdo;

  @Expose()
  public commentsCount!: number;

  @Expose()
  @Type(() => CoordinatesRdo)
  public coordinates!: CoordinatesRdo;
}
