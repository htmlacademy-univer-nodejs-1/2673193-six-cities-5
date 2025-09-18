import { AmenityType } from './amenities.enum.js';
import { Coordinates } from './coodrinates.type.js';
import { City } from './cities.enum.js';
import { OfferType } from './offer-type.enum.js';
import { User } from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxGuests: number;
  price: number;
  amenities: AmenityType[];
  author: User;
  commentsCount: number;
  coordinates: Coordinates;
}
