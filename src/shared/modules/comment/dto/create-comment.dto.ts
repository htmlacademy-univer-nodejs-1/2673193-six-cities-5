import { IsMongoId, IsNumber, IsString, Max, MaxLength, Min, MinLength, Validate } from 'class-validator';
import { OneDecimalRule } from '../../offer/index.js';
import { Type } from 'class-transformer';
import { CreateCommentValidationMessage } from './create-comment.message.js';

export class CreateCommentDto {
  @IsString({message: CreateCommentValidationMessage.text.invalidFormat})
  @MinLength(5, {message: CreateCommentValidationMessage.text.tooShort})
  @MaxLength(1024, {message: CreateCommentValidationMessage.text.tooLong})
  public text: string;

  @IsNumber({}, {message: CreateCommentValidationMessage.rating.invalidFormat})
  @Min(1, {message: CreateCommentValidationMessage.rating.tooSmall})
  @Max(5, {message: CreateCommentValidationMessage.rating.tooLarge})
  @Validate(OneDecimalRule, {message: CreateCommentValidationMessage.rating.invalidFormat})
  @Type(() => Number)
  public rating: number;

  @IsMongoId({message: CreateCommentValidationMessage.offerId.invalidFormat})
  public offerId: string;

  public authorId: string;
}
