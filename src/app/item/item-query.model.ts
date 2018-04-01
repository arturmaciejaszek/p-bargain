export interface ItemQuery {
    ownerUID?: string;
    town?: string;
    category?: string;
    price?: {minPrice: number, maxPrice: number};
}
