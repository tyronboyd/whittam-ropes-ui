"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var http_1 = require("@angular/http");
var secure_http_service_1 = require("../services/secure.http.service");
var constants_1 = require("../util/constants");
var OrderService = (function () {
    function OrderService(http) {
        this.http = http;
        this.order = new Rx_1.BehaviorSubject(new Array());
        this.order$ = this.order.asObservable();
    }
    OrderService.prototype.saveOrder = function (order) {
        return this.http.postWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'save/order', order, null);
    };
    OrderService.prototype.deleteOrder = function (order) {
        return this.http.deleteWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'delete/order', null, order, null);
    };
    OrderService.prototype.updateOrder = function (id, status) {
        var myParams = new http_1.URLSearchParams();
        myParams.set('id', id);
        myParams.set('status', status);
        return this.http.putWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'update/order', myParams, null, null);
    };
    OrderService.prototype.fetchOrder = function () {
        return this.http.getWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'order', null, null);
    };
    OrderService.prototype.deleteAllOrders = function () {
        return this.http.deleteWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'delete-all/orders', null, null, null);
    };
    OrderService.prototype.getOrder = function () {
        return this.order.getValue();
    };
    OrderService.prototype.setOrder = function (order) {
        this.order.next(order);
    };
    return OrderService;
}());
OrderService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [secure_http_service_1.SecureHttpService])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map