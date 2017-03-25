import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { OrderService } from '../services/order.service';
import { InventoryService } from '../services/inventory.service';
import { Order } from '../models/order';
import { Inventory } from '../models/inventory';
import { Subscription } from 'rxjs/Subscription';
import { ChatService } from '../services/chat.service';

declare var $: any;

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
    inventorySubscription: Subscription;
    selectedItem: string;
    fetchCount: number = 0;
    inventoryData: Array<Inventory> = [];
    status: string = "Incomplete";

    //validation
    validateBarcode: boolean = true;
    validateTitle: boolean = true;
    validateItemId: boolean = true;
    validateQuantity: boolean = true;


    @ViewChild('fileInput') inputEl: ElementRef;
    constructor(private chatService: ChatService, private inventoryService: InventoryService, private orderService: OrderService) { }

    ngOnInit() {
      this.subscription = this.orderService.order$.subscribe(
        orders => {
          this.orders = orders;
        });

      this.fetchInventory();
      // Fetch orders for each computer
      this.chatService.messages.subscribe(msg => {
          this.fetchOrders();
        });
    }

   saveOrder(barcode, itemId, title, quantity) {

     if (title.length > 0 && itemId.length > 0 &&
       quantity && quantity > 0 && barcode.length > 0 && barcode.length >= 13) {
       const order = new Order();
       order.barcode = barcode;
       order.itemId = itemId;
       order.title = title;
       order.status = this.status;
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
         } else {
           this.validateForm(barcode, itemId, title, quantity);
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

    fileChangeEvent(event) {
        let fileList: FileList = event.target.files;
        if (fileList.length > 0) {
          let file: File = fileList[0];
          let data = null;
           let reader: FileReader = new FileReader();
           reader.onload = () => {
               var csvData = reader.result;
               data = $.csv.toObjects(csvData);
               for (let i = 0; i < data.length; i++) {
                 this.inventoryData.push({
                   uniqueid: data[i].UNIQUEID,
                   barcode: data[i].BARCODE,
                   title: data[i].TITLE,
                   id: null
                 })
               }
               this.saveAllInventory(this.inventoryData);
            }
         reader.readAsText(file);
         reader.onerror = function () {
             alert('Unable to read ' + file);
         };
      }
    }

    saveAllInventory(inventory) {
      this.inventoryService.saveAllInventory(inventory).subscribe(
        (inventory) => {
          console.log('saved inventory');
          this.fetchInventory();
        },
        (err) => {
          console.log("there was an error:" + err);
        });
    }

    saveInventory(inventory) {
      this.inventoryService.saveInventory(inventory).subscribe(
        (inventory) => {
          console.log('saved inventory');
          this.fetchInventory();
        },
        (err) => {
          console.log("there was an error:" + err);
        });
    }

    deleteInventory() {
      this.inventoryService.deleteAllInventory().subscribe(
        (inventory) => {
          console.log('deleted all inventory');
          this.fetchInventory();
        },
        (err) => {
          console.log("there was an error:" + err);
        });
    }

    deleteOrders() {
      this.orderService.deleteAllOrders().subscribe(
        (inventory) => {
          console.log('deleted all orders');
          this.fetchOrders();
        },
        (err) => {
          console.log("there was an error:" + err);
        });
    }

   validateForm(barcode, itemId, title, quantity) {
     barcode.length !== 13 ? this.validateBarcode = false : this.validateBarcode = true;
     itemId.length == 0 ? this.validateItemId = false : this.validateItemId = true;
     title.length == 0 ? this.validateTitle = false : this.validateTitle = true;
     quantity == 0 ? this.validateQuantity = false : this.validateQuantity = true;
   }
}
