import { Playlist } from "./playlist.model";

export class Client{
    public id!: string;
    public name!: string;
    public username!: string;
    public password!: string;
    public playlist!: Playlist;
}