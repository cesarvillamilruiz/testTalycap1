import { Book } from "./Book";

export interface AuthorDTO{
  id: number;
  firstName: string;
  lastName: string;
  books: Book[];
}
