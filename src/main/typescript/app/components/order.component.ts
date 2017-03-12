import { Component, Input } from '@angular/core';
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

  constructor(private chatService: ChatService, private orderService: OrderService, private webSocketService: WebsocketService) {}

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

}
