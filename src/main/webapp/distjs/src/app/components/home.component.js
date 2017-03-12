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
var inventory_service_1 = require("../services/inventory.service");
var order_1 = require("../models/order");
var HomeComponent = (function () {
    function HomeComponent(inventoryService, orderService) {
        this.inventoryService = inventoryService;
        this.orderService = orderService;
        this.barcode = '';
        this.title = '';
        this.itemId = '';
        this.quantity = 0;
        this.fetchCount = 0;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.orderService.order$.subscribe(function (orders) {
            _this.orders = orders;
        });
        this.fetchInventory();
    };
    HomeComponent.prototype.onKey = function (event) {
        this.barcode = event.target.value;
    };
    HomeComponent.prototype.saveOrder = function (barcode, itemId, title, quantity) {
        var _this = this;
        if (title && itemId && quantity) {
            var order = new order_1.Order();
            order.barcode = barcode;
            order.itemId = itemId;
            order.title = title;
            order.quantity = parseInt(quantity, 10);
            this.orderService.saveOrder(order).subscribe(function (savedOrder) {
                _this.orderService.setOrder(_this.orders);
                _this.fetchCount++;
                _this.barcode = '';
                _this.title = '';
                _this.itemId = '';
                _this.quantity = null;
                _this.fetchOrders();
            }, function (err) {
                console.log("there was an error:" + err);
            });
        }
    };
    HomeComponent.prototype.fetchOrders = function () {
        var _this = this;
        this.orderService.fetchOrder().subscribe(function (order) {
            _this.orders = order;
            _this.orderService.setOrder(_this.orders);
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    HomeComponent.prototype.fetchInventory = function () {
        var _this = this;
        this.inventoryService.fetchInventory().subscribe(function (inventory) {
            _this.inventory = inventory;
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    HomeComponent.prototype.onchange = function (event) {
        var id = event.target.value;
        var inventory = this.inventory;
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].id == id) {
                this.barcode = inventory[i].barcode;
                this.title = inventory[i].title;
                this.itemId = inventory[i].uniqueid;
            }
        }
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'views/home.html'
    }),
    __metadata("design:paramtypes", [inventory_service_1.InventoryService, order_service_1.OrderService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map