export interface Item {
    uid: string;
    owner: string;
    name: string;
    category: string;
    desc: string;
    photos: string[];
    price: string;
    posted: Date;
    status: string;
    town: string;
    buyer?: string;
    sold?: Date;
}
