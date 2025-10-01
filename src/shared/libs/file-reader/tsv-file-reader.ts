import { Offer, OfferType, City, AmenityType, UserType } from '../../types/index.js';
import { FileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor(
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, 'utf-8');
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File was not read. Call read() method before toArray().');
    }

    return this.rawData
      .split('\n')
      .filter((line) => line.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([title, description, publicationDate, city, previewImage, images, isPremium, isFavourite, rating, type, bedrooms, maxGuests, price, amenities, authorName, authorEmail, authorAvatar, authorPassword, authorType, commentsCount, coordinates]): Offer => ({
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
        author: {
          name: authorName,
          email: authorEmail,
          avatar: authorAvatar,
          password: authorPassword,
          type: authorType as UserType,
        },
        commentsCount: parseInt(commentsCount, 10),
        coordinates: {
          latitude: Number.parseFloat(coordinates.split(',')[0]),
          longitude: Number.parseFloat(coordinates.split(',')[1]),
        },
      }));
  }
}
