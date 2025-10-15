import { City, Coordinates, OfferType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public publicationDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: OfferType;
  public bedrooms: number;
  public maxGuests: number;
  public price: number;
  public amenities: string[];
  public authorId: string;
  public commentsCount: number;
  public coordinates: Coordinates;
}
