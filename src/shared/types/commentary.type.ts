import { User } from './user.type.js';

export type Commentary = {
  text: string;
  publicationDate: string;
  rating: number;
  author: User;
}
