
import { Book } from "./book.model";
import { User } from "./user.model";


export interface Invoice {
    id: number;
    books: Book[];
    totalPrice: number;
    issuedAt: string;
    user: User;
  }