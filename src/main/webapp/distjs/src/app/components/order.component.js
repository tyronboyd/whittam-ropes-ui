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
var router_1 = require("@angular/router");
var order_service_1 = require("../services/order.service");
var chat_service_1 = require("../services/chat.service");
var inventory_service_1 = require("../services/inventory.service");
var websocket_service_1 = require("../services/websocket.service");
var order_1 = require("../models/order");
var constants_1 = require("../util/constants");
var OrderComponent = (function () {
    function OrderComponent(route, chatService, orderService, webSocketService, inventoryService) {
        this.route = route;
        this.chatService = chatService;
        this.orderService = orderService;
        this.webSocketService = webSocketService;
        this.inventoryService = inventoryService;
        this.messages = [];
        this.inputValue = '';
        this.isOnOrdersPage = false;
        this.isOnCompletedOrders = false;
        this.inventoryNotFound = false;
        this.isInOrderList = false;
        if (this.route.snapshot.url[0].path === 'orders') {
            this.isOnOrdersPage = true;
        }
        else if (this.route.snapshot.url[0].path === 'complete-orders') {
            this.isOnCompletedOrders = true;
        }
    }
    OrderComponent.prototype.ngAfterViewInit = function () {
        this.isOnOrdersPage ? this.barcodeInput.nativeElement.focus() : null;
    };
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
    OrderComponent.prototype.deleteOrder = function (order) {
        var _this = this;
        this.orderService.deleteOrder(order).subscribe(function (order) {
            console.log('order deleted:' + order);
            _this.inputValue = '';
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    OrderComponent.prototype.updateOrder = function (id, status, quantity, totalQualtity) {
        var _this = this;
        this.orderService.updateOrder(id, status, quantity, totalQualtity).subscribe(function (order) {
            console.log('order updated:' + order);
            _this.inputValue = '';
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    OrderComponent.prototype.sortOrders = function (a, b) {
        if (a.title < b.title) {
            return -1;
        }
        else if (a.title > b.title) {
            return 1;
        }
        else {
            return 0;
        }
    };
    OrderComponent.prototype.processBarcode = function (value) {
        var tempQuantity = 0;
        var tempTotalQuantity = 0;
        if (value.length == 13) {
            for (var i = 0; i < this.orders.length; i++) {
                if (this.orders[i].barcode == value && this.orders[i].status === 'Incomplete') {
                    this.isInOrderList = true;
                    if (this.orders[i].quantity > 1) {
                        tempQuantity = (this.orders[i].quantity - 1);
                        tempTotalQuantity = (this.orders[i].totalQuantity + 1);
                        this.updateOrder(this.orders[i].id, 'Incomplete', tempQuantity, tempTotalQuantity);
                        break;
                    }
                    else {
                        this.updateOrder(this.orders[i].id, 'Complete', 0, this.orders[i].totalQuantity + 1);
                        break;
                    }
                }
                else {
                    this.inputValue = '';
                    this.isInOrderList = false;
                }
            }
            if (!this.isInOrderList)
                this.processNewOrder(value);
        }
        else if (value.length > 13) {
            this.inputValue = '';
        }
    };
    OrderComponent.prototype.processNewOrder = function (value) {
        var _this = this;
        if (value.length == 13) {
            if (this.orders.length > 0) {
                for (var i = 0; i < this.orders.length; i++) {
                    if (this.orders[i].status === 'New Order' && this.orders[i].barcode === value) {
                        return this.updateOrder(this.orders[i].id, 'New Order', this.orders[i].quantity - 1, this.orders[i].totalQuantity + 1);
                        break;
                    }
                }
            }
            this.inventoryService.fetchInventory().subscribe(function (inventory) {
                _this.inventory = inventory;
                var order = new order_1.Order();
                if (inventory && inventory.length > 0) {
                    for (var i = 0; i < inventory.length; i++) {
                        if (inventory[i].barcode === value) {
                            order.barcode = _this.inventory[i].barcode;
                            order.itemId = _this.inventory[i].uniqueid;
                            order.title = _this.inventory[i].title;
                            order.quantity = -1;
                            order.totalQuantity = 1;
                            order.status = "New Order";
                            _this.saveOrder(order);
                            break;
                        }
                    }
                }
            }, function (err) {
                console.log("there was an error:" + err);
            });
            this.orderNotFound = null;
        }
    };
    OrderComponent.prototype.fetchInventory = function () {
        var _this = this;
        this.inventoryService.fetchInventory().subscribe(function (inventory) {
            _this.inventory = inventory;
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    OrderComponent.prototype.saveOrder = function (order) {
        var _this = this;
        this.orderService.saveOrder(order).subscribe(function (savedOrder) {
            _this.orderService.setOrder(_this.orders);
            _this.fetchOrders();
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    return OrderComponent;
}());
__decorate([
    core_1.ViewChild('barcodeInputField'),
    __metadata("design:type", Object)
], OrderComponent.prototype, "barcodeInput", void 0);
OrderComponent = __decorate([
    core_1.Component({
        selector: 'orders',
        templateUrl: 'views/orders.html'
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, chat_service_1.ChatService, order_service_1.OrderService, websocket_service_1.WebsocketService,
        inventory_service_1.InventoryService])
], OrderComponent);
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map