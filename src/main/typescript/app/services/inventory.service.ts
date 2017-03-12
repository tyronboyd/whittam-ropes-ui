import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Inventory } from '../models/inventory';
import { Headers } from '@angular/http';
import { SecureHttpService } from '../services/secure.http.service';
import { Constants } from '../util/constants';

@Injectable()
export class InventoryService {

  constructor(private http: SecureHttpService) { }

  inventory: BehaviorSubject<Array<Inventory>> = new BehaviorSubject<Array<Inventory>>(new Array<Inventory>());
  inventory$ = this.inventory.asObservable();

  saveInventory(inventory) {
    return this.http.postWithHeaders(Constants.WHITTAM_REST_URL + 'save/inventory', inventory, null);
  }

  fetchInventory() {
    return this.http.getWithHeaders(Constants.WHITTAM_REST_URL + 'inventory', null, null);
  }

  getInventory() {
    return this.inventory.getValue();
  }

  setOrder(inventory) {
   this.inventory.next(inventory);
  }
}
