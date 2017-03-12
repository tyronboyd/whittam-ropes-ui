import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Order } from '../models/order';
import { Headers } from '@angular/http';
import { SecureHttpService } from '../services/secure.http.service';
import { Constants } from '../util/constants';

@Injectable()
export class OrderService {

  constructor(private http: SecureHttpService) { }

  order: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(new Array<Order>());
  order$ = this.order.asObservable();

  saveOrder(order) {
    return this.http.postWithHeaders(Constants.WHITTAM_REST_URL + '/save/order', order, null);
  }

  fetchOrder() {
    return this.http.getWithHeaders(Constants.WHITTAM_REST_URL + 'order', null, null);
  }

  getOrder() {
    return this.order.getValue();
  }

  setOrder(order) {
   this.order.next(order);
  }
}
