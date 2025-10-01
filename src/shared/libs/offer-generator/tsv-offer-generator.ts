import { OfferGenerator } from './offer-generator.interface.js';
import { AmenityType, City, CITY_COORDINATES, MockServerData, OfferType, UserType } from '../../types/index.js';
import { generateRandomPassword, generateRandomValue, getRandomItem, getRandomItems } from '../../helpers/common.js';
import dayjs from 'dayjs';

const FIRST_DAY = 1;
const LAST_DAY = 7;

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const publicationDate = dayjs().subtract(generateRandomValue(FIRST_DAY, LAST_DAY), 'day').toISOString();
    const city = getRandomItem<string>(this.mockData.cities);
    const previewImage = getRandomItem<string>(this.mockData.previewImages);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomItem<string>(['true', 'false']);
    const isFavorite = getRandomItem<string>(['true', 'false']);
    const rating = generateRandomValue(0.0, 5.0, 1).toString();
    const type = getRandomItem<string>([OfferType.Apartment, OfferType.Hotel, OfferType.House, OfferType.Room]);
    const bedrooms = generateRandomValue(1, 8).toString();
    const maxGuests = generateRandomValue(1, 10).toString();
    const price = generateRandomValue(100, 100000).toString();
    const amenities = getRandomItems<string>([AmenityType.AirConditioning, AmenityType.BabySeat, AmenityType.Breakfast, AmenityType.Fridge, AmenityType.LaptopFriendlyWorkspace, AmenityType.Towels, AmenityType.Washer]).join(';');
    const authorName = getRandomItem<string>(this.mockData.authorsNames);
    const email = getRandomItem<string>(this.mockData.emails);
    const avatar = getRandomItem<string>(this.mockData.avatars);
    const password = generateRandomPassword();
    const authorType = getRandomItem<string>([UserType.Pro, UserType.Regular]);
    const commentsCount = 0;
    const coordinates = CITY_COORDINATES[city as City];

    return [
      title,
      description,
      publicationDate,
      city,
      previewImage,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxGuests,
      price,
      amenities,
      authorName,
      email,
      avatar,
      password,
      authorType,
      commentsCount,
      `${coordinates.latitude},${coordinates.longitude}`
    ].join('\t');
  }
}
