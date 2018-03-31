import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

import { Item } from './item.model';

@Injectable()
export class ItemService {

    constructor(private db: AngularFirestore) {}

    createItem(uid: string, item: Item) {
        return this.db.collection('items').doc(uid).set(item);
    }

    updateItem(uid: string, data: Partial<Item>) {
        return this.db.collection('items').doc(uid).update(data);
    }

    deleteItem(uid: string) {
        return this.db.collection('items').doc(uid).delete();
    }

}
