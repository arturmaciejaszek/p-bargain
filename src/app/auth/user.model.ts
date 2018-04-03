import { IgnoredItem } from './../item/ignored-item.model';

export interface User {
    uid: string;
    name: string;
    email: string;
    photoURL?: string;
    town?: string;
    status?: string;
    premium?: boolean;
    fastbuy?: boolean;
    rank?: number;
    ignored?: IgnoredItem[];
}
