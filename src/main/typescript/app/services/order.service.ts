import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { Order } from '../models/order';
import { Headers, URLSearchParams } from '@angular/http';
import { SecureHttpService } from '../services/secure.http.service';
import { Constants } from '../util/constants';

@Injectable()
export class OrderService {

  constructor(private http: SecureHttpService) { }

  order: BehaviorSubject<Array<Order>> = new BehaviorSubject<Array<Order>>(new Array<Order>());
  order$ = this.order.asObservable();

  saveOrder(order) {
    return this.http.postWithHeaders(Constants.WHITTAM_REST_URL + 'save/order', order, null);
  }

  deleteOrder(order) {
    return this.http.deleteWithHeaders(Constants.WHITTAM_REST_URL + 'delete/order', null, order, null);
  }

  updateOrder(id, status) {
    let myParams: URLSearchParams = new URLSearchParams();
    myParams.set('id', id);
    myParams.set('status', status);
    return this.http.putWithHeaders(Constants.WHITTAM_REST_URL + 'update/order', myParams, null, null);
  }

  fetchOrder() {
    return this.http.getWithHeaders(Constants.WHITTAM_REST_URL + 'order', null, null);
  }

  deleteAllOrders() {
    return this.http.deleteWithHeaders(Constants.WHITTAM_REST_URL + 'delete-all/orders', null, null, null);
  }

  getOrder() {
    return this.order.getValue();
  }

  setOrder(order) {
   this.order.next(order);
  }
}
