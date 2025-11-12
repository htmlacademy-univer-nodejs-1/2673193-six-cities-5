import { Expose } from 'class-transformer';
import { OfferType } from '../../../types/index.js';

export class OfferShortRdo {
  @Expose()
  public id!: string;

  @Expose()
  public title!: string;

  @Expose()
  public publicationDate!: string;

  @Expose()
  public city!: string;

  @Expose()
  public previewImage!: string;

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
  public commentsCount!: number;
}
