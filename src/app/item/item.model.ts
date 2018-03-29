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
    buyer?: string;
    sold?: Date;
}
