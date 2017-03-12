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
var order_service_1 = require("../services/order.service");
var chat_service_1 = require("../services/chat.service");
var websocket_service_1 = require("../services/websocket.service");
var constants_1 = require("../util/constants");
var OrderComponent = (function () {
    function OrderComponent(chatService, orderService, webSocketService) {
        this.chatService = chatService;
        this.orderService = orderService;
        this.webSocketService = webSocketService;
        this.messages = [];
    }
    OrderComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.webSocketService.connect(constants_1.Constants.WHITTAM_WEBSOCKET_URL);
        this.subscription = this.orderService.order$.subscribe(function (orders) {
            _this.orders = orders;
        });
        this.fetchOrders();
        // Fetch orders for each computer
        this.chatService.messages.subscribe(function (msg) {
            _this.fetchOrders();
        });
    };
    OrderComponent.prototype.fetchOrders = function () {
        var _this = this;
        this.orderService.fetchOrder().subscribe(function (order) {
            _this.orders = order;
            _this.orderService.setOrder(_this.orders);
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    return OrderComponent;
}());
OrderComponent = __decorate([
    core_1.Component({
        selector: 'orders',
        templateUrl: 'views/orders.html'
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, order_service_1.OrderService, websocket_service_1.WebsocketService])
], OrderComponent);
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map