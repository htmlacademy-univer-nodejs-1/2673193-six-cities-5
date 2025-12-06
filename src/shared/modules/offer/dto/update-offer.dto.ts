import {
  IsDateString,
  IsOptional,
  Max,
  MaxLength,
  MinLength,
  IsString,
  IsEnum,
  IsUrl,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsBoolean,
  IsNumber,
  Min,
  IsInt,
  Validate,
  IsNotEmpty
} from 'class-validator';
import { Type } from 'class-transformer';
import { City, OfferType, Coordinates } from '../../../types/index.js';
import { AmenityType } from '../../../types/amenities.enum.js';
import { CreateOfferValidationMessage as CreateUpdateOfferValidationMessage } from './create-offer.messages.js';
import { CityCoordinatesMatch, OneDecimalRule } from './create-offer.dto.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString()
  @MinLength(10, { message: CreateUpdateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateUpdateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString()
  @MinLength(20, { message: CreateUpdateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateUpdateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  @IsDateString({}, { message: CreateUpdateOfferValidationMessage.publicationDate.invalidFormat })
  public publicationDate?: string;

  @IsOptional()
  @IsEnum(City, { message: CreateUpdateOfferValidationMessage.city.invalid })
  public city?: City;

  @IsOptional()
  @IsString()
  @IsUrl({}, { message: CreateUpdateOfferValidationMessage.previewImage.invalidUrl })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferValidationMessage.images.invalidFormat })
  @ArrayMinSize(6, { message: CreateUpdateOfferValidationMessage.images.length })
  @ArrayMaxSize(6, { message: CreateUpdateOfferValidationMessage.images.length })
  @IsUrl({}, { each: true, message: CreateUpdateOfferValidationMessage.images.invalidUrl })
  public images?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isPremium.invalidType })
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({ message: CreateUpdateOfferValidationMessage.isFavorite.invalidType })
  public isFavorite?: boolean;

  @IsOptional()
  @IsNumber({}, { message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.rating.minValue })
  @Max(5, { message: CreateUpdateOfferValidationMessage.rating.maxValue })
  @Validate(OneDecimalRule, { message: CreateUpdateOfferValidationMessage.rating.invalidFormat })
  @Type(() => Number)
  public rating?: number;

  @IsOptional()
  @IsEnum(OfferType, { message: CreateUpdateOfferValidationMessage.type.invalid })
  public type?: OfferType;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateUpdateOfferValidationMessage.rooms.maxValue })
  @Type(() => Number)
  public bedrooms?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateUpdateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateUpdateOfferValidationMessage.guests.maxValue })
  @Type(() => Number)
  public maxGuests?: number;

  @IsOptional()
  @IsInt({ message: CreateUpdateOfferValidationMessage.price.invalidFormat })
  @Min(100, { message: CreateUpdateOfferValidationMessage.price.minValue })
  @Max(100000, { message: CreateUpdateOfferValidationMessage.price.maxValue })
  @Type(() => Number)
  public price?: number;

  @IsOptional()
  @IsArray({ message: CreateUpdateOfferValidationMessage.amenities.invalidFormat })
  @ArrayMinSize(1, { message: CreateUpdateOfferValidationMessage.amenities.required })
  @IsEnum(AmenityType, { each: true, message: CreateUpdateOfferValidationMessage.amenities.invalidValue })
  public amenities?: AmenityType[];

  @IsOptional()
  @IsNotEmpty({ message: CreateUpdateOfferValidationMessage.coordinates.required })
  @Validate(CityCoordinatesMatch, { message: CreateUpdateOfferValidationMessage.coordinates.invalidFormat })
  public coordinates?: Coordinates;
}
