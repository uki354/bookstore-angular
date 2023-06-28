import { Genre } from "./genre.model";

export interface Book{
    id:number,
    name:string,
    author:string,
    issuedAt:Date,
    numOfPages:number,
    publication:string,
    genre: Genre[],
    about:string;
    quantity:number;
    price:number;
}