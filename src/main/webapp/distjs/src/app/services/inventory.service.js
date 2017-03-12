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
var secure_http_service_1 = require("../services/secure.http.service");
var constants_1 = require("../util/constants");
var InventoryService = (function () {
    function InventoryService(http) {
        this.http = http;
        this.inventory = new Rx_1.BehaviorSubject(new Array());
        this.inventory$ = this.inventory.asObservable();
    }
    InventoryService.prototype.saveInventory = function (inventory) {
        return this.http.postWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'save/inventory', inventory, null);
    };
    InventoryService.prototype.fetchInventory = function () {
        return this.http.getWithHeaders(constants_1.Constants.WHITTAM_REST_URL + 'inventory', null, null);
    };
    InventoryService.prototype.getInventory = function () {
        return this.inventory.getValue();
    };
    InventoryService.prototype.setOrder = function (inventory) {
        this.inventory.next(inventory);
    };
    return InventoryService;
}());
InventoryService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [secure_http_service_1.SecureHttpService])
], InventoryService);
exports.InventoryService = InventoryService;
//# sourceMappingURL=inventory.service.js.map