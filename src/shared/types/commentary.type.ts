import { User } from './user.type';

export type Commentary = {
  text: string;
  publicationDate: string;
  rating: number;
  author: User;
}
