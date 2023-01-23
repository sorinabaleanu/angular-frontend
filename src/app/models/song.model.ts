import { Artist
 } from "./artist.model";
export class Song{
    public id!: string;
    public name!: string;
    public artist!: Artist;
}