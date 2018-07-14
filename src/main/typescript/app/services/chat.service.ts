import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from '../models/message';
import { OrderService } from './order.service';
import { WebsocketService } from './websocket.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';

const CHAT_URL = 'ws://192.168.0.10:8080/whittam-ropes/order-added';

@Injectable()
export class ChatService {
	public messages: Subject<Message>  = new Subject<Message>();

	constructor(private wsService: WebsocketService, private orderService: OrderService) {

		// 1. subscribe to chatbox
		this.messages   = <Subject<Message>>this.wsService
			.connect(CHAT_URL)
			.map((response: MessageEvent): Message => {
        console.log(response.data);
				return response.data;
			});
	}
} // end class ChatService
