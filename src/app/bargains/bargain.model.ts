import { Item } from '../item/item.model';

export interface Bargain extends Item {
    hasUnread?: string | null;
    buyerRated?: boolean;
    ownerRated?: boolean;
}
