import { City, OfferType } from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public publicationDate?: Date;
  public city?: City;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: OfferType;
  public bedrooms?: number;
  public maxGuests?: number;
  public price?: number;
  public amenities?: string[];
  public coordinates?: [number, number];
}
