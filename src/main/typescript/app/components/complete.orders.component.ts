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
    selector: 'complete-orders',
    templateUrl: 'views/complete-orders.html'
})

export class CompleteOrdersComponent {

}
