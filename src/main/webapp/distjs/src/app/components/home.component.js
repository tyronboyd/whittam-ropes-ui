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
var chat_service_1 = require("../services/chat.service");
var HomeComponent = (function () {
    function HomeComponent(chatService, inventoryService, orderService) {
        this.chatService = chatService;
        this.inventoryService = inventoryService;
        this.orderService = orderService;
        this.barcode = '';
        this.title = '';
        this.itemId = '';
        this.quantity = 0;
        this.fetchCount = 0;
        this.inventoryData = [];
        this.status = "Incomplete";
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.orderService.order$.subscribe(function (orders) {
            _this.orders = orders;
        });
        this.fetchInventory();
        // Fetch orders for each computer
        this.chatService.messages.subscribe(function (msg) {
            _this.fetchOrders();
        });
    };
    HomeComponent.prototype.saveOrder = function (barcode, itemId, title, quantity) {
        var _this = this;
        if (title && itemId && quantity) {
            var order = new order_1.Order();
            order.barcode = barcode;
            order.itemId = itemId;
            order.title = title;
            order.status = this.status;
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
            console.log(_this.inventory);
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
    HomeComponent.prototype.fileChangeEvent = function (event) {
        var _this = this;
        var fileList = event.target.files;
        if (fileList.length > 0) {
            var file_1 = fileList[0];
            var data_1 = null;
            var reader_1 = new FileReader();
            reader_1.onload = function () {
                var csvData = reader_1.result;
                data_1 = $.csv.toObjects(csvData);
                for (var i = 0; i < data_1.length; i++) {
                    _this.inventoryData.push({
                        barcode: data_1[i].BARCODE,
                        title: data_1[i].TITLE,
                        uniqueId: data_1[i].UNIQUEID
                    });
                }
                _this.saveAllInventory(_this.inventoryData);
            };
            reader_1.readAsText(file_1);
            reader_1.onerror = function () {
                alert('Unable to read ' + file_1);
            };
        }
    };
    HomeComponent.prototype.saveAllInventory = function (inventory) {
        var _this = this;
        this.inventoryService.saveAllInventory(inventory).subscribe(function (inventory) {
            console.log('saved inventory');
            _this.fetchInventory();
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    HomeComponent.prototype.saveInventory = function (inventory) {
        var _this = this;
        this.inventoryService.saveInventory(inventory).subscribe(function (inventory) {
            console.log('saved inventory');
            _this.fetchInventory();
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    HomeComponent.prototype.deleteInventory = function () {
        var _this = this;
        this.inventoryService.deleteAllInventory().subscribe(function (inventory) {
            console.log('deleted all inventory');
            _this.fetchInventory();
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    HomeComponent.prototype.deleteOrders = function () {
        var _this = this;
        this.orderService.deleteAllOrders().subscribe(function (inventory) {
            console.log('deleted all orders');
            _this.fetchOrders();
        }, function (err) {
            console.log("there was an error:" + err);
        });
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('fileInput'),
    __metadata("design:type", core_1.ElementRef)
], HomeComponent.prototype, "inputEl", void 0);
HomeComponent = __decorate([
    core_1.Component({
        selector: 'home',
        templateUrl: 'views/home.html'
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService, inventory_service_1.InventoryService, order_service_1.OrderService])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map