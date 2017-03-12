import { Component, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../services/order.service';
import { InventoryService } from '../services/inventory.service';
import { Order } from '../models/order';
import { Inventory } from '../models/inventory';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'home',
    templateUrl: 'views/home.html'
})

export class HomeComponent {

    barcode: string = '';
    orders: Array<Order>;
    inventory: Array<Inventory>;
    title: string = '';
    itemId: string = '';
    quantity: number = 0;
    subscription: Subscription;
    selectedItem: string;
    fetchCount: number = 0;

    constructor(private inventoryService: InventoryService, private orderService: OrderService) { }

    ngOnInit() {
      this.subscription = this.orderService.order$.subscribe(
        orders => {
          this.orders = orders;
        });
      this.fetchInventory();
    }

    onKey(event) {
     this.barcode = event.target.value;
   }

   saveOrder(barcode, itemId, title, quantity) {
     if (title && itemId && quantity) {
       const order = new Order();
       order.barcode = barcode;
       order.itemId = itemId;
       order.title = title;
       order.quantity = parseInt(quantity, 10);
         this.orderService.saveOrder(order).subscribe(
           (savedOrder) => {
             this.orderService.setOrder(this.orders);
             this.fetchCount++;
             this.barcode = '';
             this.title = '';
             this.itemId = '';
             this.quantity = null;
             this.fetchOrders();
           },
           (err) => {
             console.log("there was an error:" + err);
           });
         }
   }

   fetchOrders() {
     this.orderService.fetchOrder().subscribe(
       (order) => {
         this.orders = order;
         this.orderService.setOrder(this.orders);
       },
       (err) => {
         console.log("there was an error:" + err);
       });
   }

   fetchInventory() {
     this.inventoryService.fetchInventory().subscribe(
       (inventory) => {
         this.inventory = inventory
       },
       (err) => {
         console.log("there was an error:" + err);
       });
   }

   onchange(event) {
     const id = event.target.value;
     const inventory = this.inventory;
     for (let i = 0; i < inventory.length; i++) {
       if (inventory[i].id == id) {
         this.barcode = inventory[i].barcode;
         this.title = inventory[i].title;
         this.itemId = inventory[i].uniqueid;
       }
     }
   }
}
