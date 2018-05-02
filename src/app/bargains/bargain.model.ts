import { Item } from '../item/item.model';

export interface Bargain extends Item {
    hasUnread?: boolean;
    buyerRated?: boolean;
    ownerRated?: boolean;
}
