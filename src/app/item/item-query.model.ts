export interface ItemQuery {
    ownerUID?: string;
    town?: string;
    category?: string;
    price?: {minPrice?: number, maxPrice?: number};
}

// COMPOUND QUERIES WONT WORK WITH BOTH == AND RANGE COMPARISSION, I HAVE TO REFACTOR DATA TO EQALS LIKE BRACKESTS
// BECAUSE I CANT INDEX EVERY TOWN ON EARTH 