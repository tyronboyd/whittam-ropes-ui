import { Component, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ChatService } from '../services/chat.service';
import { InventoryService } from '../services/inventory.service';
import { WebsocketService } from '../services/websocket.service';
import { Order } from '../models/order';
import { Inventory } from '../models/inventory';
import { Subscription } from 'rxjs/Subscription';
import { Message } from '../models/message';
import { Constants } from '../util/constants';

@Component({
    selector: 'orders',
    templateUrl: 'views/orders.html'
})

export class OrderComponent {

  orders: Array<Order>;
  messages: Message[] = [];
  barcode: string;
  inventory: Array<Inventory>;
  subscription: Subscription;
  inputValue: string = '';
  status: string;
  isOnOrdersPage: boolean = false;
  isOnCompletedOrders: boolean = false;
  inventoryNotFound: boolean = false;
  isInOrderList: boolean = false;
  @ViewChild('barcodeInputField') barcodeInput;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private orderService: OrderService, private webSocketService: WebsocketService,
  private inventoryService: InventoryService) {

    if (this.route.snapshot.url[0].path === 'orders') {
      this.isOnOrdersPage = true;
    } else if (this.route.snapshot.url[0].path === 'complete-orders') {
      this.isOnCompletedOrders = true;
    }
  }

  ngAfterViewInit() {
    this.isOnOrdersPage ? this.barcodeInput.nativeElement.focus() : null;
  }

  ngOnInit() {
    this.webSocketService.connect(Constants.WHITTAM_WEBSOCKET_URL);
    this.subscription = this.orderService.order$.subscribe(
      orders => {
        this.orders = orders;
      });
       this.fetchOrders();

       // Fetch orders for each computer
       this.chatService.messages.subscribe(msg => {
			     this.fetchOrders();
		});
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

  deleteOrder(order) {
    this.orderService.deleteOrder(order).subscribe(
      (order) => {
        console.log('order deleted:' + order);
        this.inputValue = '';
      },
      (err) => {
        console.log("there was an error:" + err);
      }
    )
  }

  updateOrder(id, status, quantity, totalQualtity) {
    this.orderService.updateOrder(id, status, quantity, totalQualtity).subscribe(
      (order) => {
        console.log('order updated:' + order);
        this.inputValue = '';
      },
      (err) => {
        console.log("there was an error:" + err);
      }
    )
  }

  sortOrders(a: Order, b: Order) {
    if (a.title < b.title) {
        return -1;
    } else if (a.title > b.title) {
        return 1;
    } else {
        return 0;
    }
  }

  processBarcode(value) {
    let tempQuantity = 0;
    let tempTotalQuantity = 0;
    if (value.length == 13) {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].barcode == value && this.orders[i].status === 'Incomplete') {
          this.isInOrderList = true;
          if (this.orders[i].quantity > 1) {
              tempQuantity = (this.orders[i].quantity - 1);
              tempTotalQuantity = (this.orders[i].totalQuantity + 1);
              this.updateOrder(this.orders[i].id, 'Incomplete', tempQuantity, tempTotalQuantity);
              break;
          } else {
              this.updateOrder(this.orders[i].id, 'Complete', 0, this.orders[i].totalQuantity + 1);
              break;
          }
        } else {
            this.inputValue = '';
            this.isInOrderList = false;
        }
      }
      if (!this.isInOrderList)
        this.processNewOrder(value);
    } else if (value.length > 13) {
      this.inputValue = '';
    }
  }

  processNewOrder(value) {
    if (value.length == 13) {
      if (this.orders.length > 0) {
        for (let i = 0; i < this.orders.length; i++) {
          if (this.orders[i].status === 'New Order' && this.orders[i].barcode === value) {
            return this.updateOrder(this.orders[i].id, 'New Order', this.orders[i].quantity - 1,
            this.orders[i].totalQuantity + 1);
            break;
          }
        }
      }
    this.inventoryService.fetchInventory().subscribe(
      (inventory) => {
        this.inventory = inventory;
        let order = new Order();
        if (inventory && inventory.length > 0) {
          for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].barcode === value) {
              order.barcode = this.inventory[i].barcode;
              order.itemId = this.inventory[i].uniqueid;
              order.title = this.inventory[i].title;
              order.quantity = -1;
              order.totalQuantity = 1;
              order.status = "New Order";
              this.saveOrder(order);
              break;
            }
          }
        }
      },
      (err) => {
        console.log("there was an error:" + err);
      });
      this.orderNotFound = null;
    }
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

  saveOrder(order) {
      this.orderService.saveOrder(order).subscribe(
        (savedOrder) => {
          this.orderService.setOrder(this.orders);
          this.fetchOrders();
        },
        (err) => {
          console.log("there was an error:" + err);
        });
    }

}
