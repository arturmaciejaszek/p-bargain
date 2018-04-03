export interface Item {
    uid: string;
    owner: string;
    name: string;
    category: string;
    desc: string;
    price: string;
    photos: string[];
    posted: Date;
    status: string;
    town: string;
    buyer?: string;
    sold?: Date;
}
