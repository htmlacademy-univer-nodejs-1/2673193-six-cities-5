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
  ValidationArguments
} from 'class-validator';
import { Type } from 'class-transformer';
import { City, OfferType, Coordinates, CITY_COORDINATES } from '../../../types/index.js';
import { AmenityType } from '../../../types/amenities.enum.js';
import { CreateUpdateOfferValidationMessage } from './create-offer.messages.js';

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
    return CreateUpdateOfferValidationMessage.coordinates.invalidFormat;
  }
}

export class CreateOfferDto {
  @IsString()
  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.title.required })
  @MinLength(10, { message: CreateUpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferValidationMessage.title.maxLength })
  public title: string;

  @IsString()
  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.description.required })
  @MinLength(20, { message: CreateUpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferValidationMessage.description.maxLength })
  public description: string;

  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.publicationDate.required })
  @IsDateString({}, { message: CreateUpdateOfferValidationMessage.publicationDate.invalidFormat })
  public publicationDate: string;

  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.city.required })
  @IsEnum(City, { message: CreateUpdateOfferValidationMessage.city.invalid })
  public city: City;

  @IsString()
  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.previewImage.required })
  @IsUrl({}, { message: CreateUpdateOfferValidationMessage.previewImage.invalidUrl })
  public previewImage: string;

  @IsArray({ message: CreateUpdateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateUpdateOfferValidationMessage.images.length })
  @ArrayMaxSize(6, { message: CreateUpdateOfferValidationMessage.images.length })
  @IsUrl({}, { each: true, message: CreateUpdateOfferValidationMessage.images.invalidUrl })
  public images: string[];

  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isPremium.invalidType })
  public isPremium: boolean;

  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isFavorite.invalidType })
  public isFavorite: boolean;

  @IsNumber({}, { message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateUpdateOfferValidationMessage.rating.maxValue })
  @Validate(OneDecimalRule, { message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  @Type(() => Number)
  public rating: number;

  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.type.required })
  @IsEnum(OfferType, { message: CreateUpdateOfferValidationMessage.type.invalid })
  public type: OfferType;

  @IsInt({ message: CreateUpdateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateUpdateOfferValidationMessage.rooms.maxValue })
  @Type(() => Number)
  public bedrooms: number;

  @IsInt({ message: CreateUpdateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateUpdateOfferValidationMessage.guests.maxValue })
  @Type(() => Number)
  public maxGuests: number;

  @IsInt({ message: CreateUpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferValidationMessage.price.maxValue })
  @Type(() => Number)
  public price: number;

  @IsArray({ message: CreateUpdateOfferValidationMessage.amenities.invalidFormat })
  @ArrayMinSize(1, { message: CreateUpdateOfferValidationMessage.amenities.required })
  @IsEnum(AmenityType, { each: true, message: CreateUpdateOfferValidationMessage.amenities.invalidValue })
  public amenities: AmenityType[];

  public authorId: string;

  @IsOptional()
  @IsInt()
  public commentsCount?: number;

  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.coordinates.required })
  @Validate(CityCoordinatesMatch, { message: CreateUpdateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates: Coordinates;
}
