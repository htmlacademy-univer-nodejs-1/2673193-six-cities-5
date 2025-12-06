import { Expose, Type } from 'class-transformer';
import { UserRdo } from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public text: string;

  @Expose({ name: 'createdAt' })
  public publicationDate: string;

  @Expose({ name: 'authorId' })
  @Type(() => UserRdo)
  public author: UserRdo;

  @Expose()
  public rating: number;
}
