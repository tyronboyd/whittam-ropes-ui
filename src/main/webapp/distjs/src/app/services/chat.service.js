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
var Subject_1 = require("rxjs/Subject");
var order_service_1 = require("./order.service");
var websocket_service_1 = require("./websocket.service");
require("rxjs/add/operator/map");
require("rxjs/add/operator/filter");
var CHAT_URL = 'ws://localhost:8080/whittam-ropes/order-added';
var ChatService = (function () {
    function ChatService(wsService, orderService) {
        this.wsService = wsService;
        this.orderService = orderService;
        this.messages = new Subject_1.Subject();
        // 1. subscribe to chatbox
        this.messages = this.wsService
            .connect(CHAT_URL)
            .map(function (response) {
            console.log(response.data);
            return response.data;
        });
    }
    return ChatService;
}()); // end class ChatService
ChatService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [websocket_service_1.WebsocketService, order_service_1.OrderService])
], ChatService);
exports.ChatService = ChatService;
//# sourceMappingURL=chat.service.js.map