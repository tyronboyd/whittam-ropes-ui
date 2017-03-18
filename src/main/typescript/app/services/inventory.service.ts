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

  saveAllInventory(inventory) {
    return this.http.postWithHeaders(Constants.WHITTAM_REST_URL + 'saveAll/inventory', inventory, null);
  }

  fetchInventory() {
    return this.http.getWithHeaders(Constants.WHITTAM_REST_URL + 'inventory', null, null);
  }

  deleteInventory(order) {
    return this.http.deleteWithHeaders(Constants.WHITTAM_REST_URL + 'delete/inventory', null, order, null);
  }

  deleteAllInventory() {
    return this.http.deleteWithHeaders(Constants.WHITTAM_REST_URL + 'delete-all/inventory', null, null, null);
  }

  getInventory() {
    return this.inventory.getValue();
  }

  setInventory(inventory) {
   this.inventory.next(inventory);
  }
}
