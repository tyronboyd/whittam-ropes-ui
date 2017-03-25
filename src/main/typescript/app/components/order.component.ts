import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../services/order.service';
import { ChatService } from '../services/chat.service';
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
  subscription: Subscription;
  inputValue: string = '';
  status: string;
  isOnOrdersPage: boolean = false;
  isOnCompletedOrders: boolean = false;

  constructor(private route: ActivatedRoute, private chatService: ChatService, private orderService: OrderService, private webSocketService: WebsocketService) {

    if (this.route.snapshot.url[0].path === 'orders') {
      this.isOnOrdersPage = true;
    } else if (this.route.snapshot.url[0].path === 'complete-orders') {
      this.isOnCompletedOrders = true;
    }
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

  updateOrder(id, status, quantity) {
    this.orderService.updateOrder(id, status, quantity).subscribe(
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
    if (value.length == 13) {
      for (let i = 0; i < this.orders.length; i++) {
        if (this.orders[i].barcode == value && this.orders[i].status === 'Incomplete') {
          if (this.orders[i].quantity > 1) {
              tempQuantity = (this.orders[i].quantity - 1);
              this.updateOrder(this.orders[i].id, 'Incomplete', tempQuantity);
              break;
          } else {
              this.updateOrder(this.orders[i].id, 'Complete', 0);
              break;
          }
        } else {
          this.inputValue = '';
        }
      }
    }
  }

}
