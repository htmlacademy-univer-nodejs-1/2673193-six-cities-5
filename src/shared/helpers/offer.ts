import { AmenityType, City, CITY_COORDINATES, Offer, OfferType, User, UserType } from '../types/index.js';

export function createOffer(offerData: string): Offer {
  const [
    title, description, publicationDate, city, previewImage, images, isPremium, isFavourite, rating, type, bedrooms, maxGuests, price, amenities, authorName, authorEmail, authorAvatar, authorPassword, authorType, commentsCount, coordinates
  ] = offerData.replace('\n', '').split('\t');

  const author: User = {
    name: authorName,
    email: authorEmail,
    avatar: authorAvatar,
    password: authorPassword,
    type: authorType as UserType,
  };

  const validCity = Object.values(City).includes(city as City) ? (city as City) : City.Paris;

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: City[city as keyof typeof City],
    previewImage,
    images: images.split(';'),
    isPremium: isPremium === 'true',
    isFavorite: isFavourite === 'true',
    rating: Number.parseFloat(rating),
    type: type as OfferType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxGuests: Number.parseInt(maxGuests, 10),
    price: Number.parseInt(price, 10),
    amenities: amenities.split(';').map((amenity) => amenity as AmenityType),
    author: author,
    commentsCount: parseInt(commentsCount, 10),
    coordinates: coordinates ? {
      latitude: Number.parseFloat(coordinates.split(',')[0]),
      longitude: Number.parseFloat(coordinates.split(',')[1]),
    }
      : CITY_COORDINATES[validCity]
  };
}
