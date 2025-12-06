import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsDateString,
  IsEnum,
  IsUrl,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsNumber,
  Min,
  Max,
  IsInt,
  IsOptional,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  IsMongoId
} from 'class-validator';
import { Type } from 'class-transformer';
import { City, OfferType, Coordinates, CITY_COORDINATES } from '../../../types/index.js';
import { AmenityType } from '../../../types/amenities.enum.js';
import { CreateOfferValidationMessage } from './create-offer.messages.js';

@ValidatorConstraint({ name: 'OneDecimal', async: false })
export class OneDecimalRule implements ValidatorConstraintInterface {
  validate(value: unknown): boolean {
    if (typeof value !== 'number') {
      return false;
    }
    return Number.isInteger(value * 10);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.property} must be a number with at most one decimal`;
  }
}

@ValidatorConstraint({ name: 'CityCoordinatesMatch', async: false })
export class CityCoordinatesMatch implements ValidatorConstraintInterface {
  validate(value: unknown, args: ValidationArguments): boolean {
    if (!value || typeof value !== 'object') {
      return false;
    }

    const coords = value as Coordinates;
    const obj = args.object as { city?: City };
    const city = obj.city as City | undefined;

    if (!city) {
      return false;
    }
    const expected = CITY_COORDINATES[city];
    if (!expected) {
      return false;
    }
    const equal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
    return equal(coords.latitude, expected.latitude) && equal(coords.longitude, expected.longitude);
  }

  defaultMessage(_args: ValidationArguments): string {
    return CreateOfferValidationMessage.coordinates.invalidFormat;
  }
}

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty({ message: CreateOfferValidationMessage.title.required })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: CreateOfferValidationMessage.description.required })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsNotEmpty({ message: CreateOfferValidationMessage.publicationDate.required })
  @IsDateString({}, { message: CreateOfferValidationMessage.publicationDate.invalidFormat })
  public publicationDate: string;

  @IsNotEmpty({ message: CreateOfferValidationMessage.city.required })
  @IsEnum(City, { message: CreateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString()
  @IsNotEmpty({ message: CreateOfferValidationMessage.previewImage.required })
  @IsUrl({}, { message: CreateOfferValidationMessage.previewImage.invalidUrl })
  public previewImage: string;

  @IsArray({ message: CreateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.images.length })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.images.length })
  @IsUrl({}, { each: true, message: CreateOfferValidationMessage.images.invalidUrl })
  public images: string[];

  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidType })
  public isPremium: boolean;

  @IsBoolean({ message: CreateOfferValidationMessage.isFavorite.invalidType })
  public isFavorite: boolean;

  @IsNumber({}, { message: CreateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateOfferValidationMessage.rating.maxValue })
  @Validate(OneDecimalRule, { message: CreateOfferValidationMessage.rating.invalidFormat })
  @Type(() => Number)
  public rating: number;

  @IsNotEmpty({ message: CreateOfferValidationMessage.type.required })
  @IsEnum(OfferType, { message: CreateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.rooms.maxValue })
  @Type(() => Number)
  public bedrooms: number;

  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  @Type(() => Number)
  public maxGuests: number;

  @IsInt({ message: CreateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateOfferValidationMessage.price.maxValue })
  @Type(() => Number)
  public price: number;

  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @ArrayMinSize(1, { message: CreateOfferValidationMessage.amenities.required })
  @IsEnum(AmenityType, { each: true, message: CreateOfferValidationMessage.amenities.invalidValue })
  public amenities: AmenityType[];

  @IsNotEmpty({ message: CreateOfferValidationMessage.authorId.required })
  @IsMongoId({ message: CreateOfferValidationMessage.authorId.invalidId })
  public authorId: string;

  @IsOptional()
  @IsInt()
  public commentsCount?: number;

  @IsNotEmpty({ message: CreateOfferValidationMessage.coordinates.required })
  @Validate(CityCoordinatesMatch, { message: CreateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates: Coordinates;
}
