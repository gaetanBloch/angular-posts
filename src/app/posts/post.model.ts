import { User } from '../auth/user.model';

export interface Post {
  _id?: string;
  title: string;
  content: string;
  imageUrl?: string;
  image?: string;
  creator?: User;
}
