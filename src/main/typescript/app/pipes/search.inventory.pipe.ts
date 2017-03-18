import { Pipe } from '@angular/core';
import { Inventory } from '../models/inventory';

@Pipe({
  name: 'searchInventory'
})
export class SearchInventoryPipe {
  transform(inventory: Array<Inventory>, args: string) {
    let inventoryArr = [];
    if (args == '') {
      return inventory;
    }
    for (let i = 0; i < inventory.length; i++) {
      if (inventory[i].title.includes(args.toUpperCase())) {
        inventoryArr.push(inventory[i]);
      }
    }
    return inventoryArr;
  }
}
