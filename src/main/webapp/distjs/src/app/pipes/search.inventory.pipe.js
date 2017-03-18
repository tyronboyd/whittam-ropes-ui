"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var SearchInventoryPipe = (function () {
    function SearchInventoryPipe() {
    }
    SearchInventoryPipe.prototype.transform = function (inventory, args) {
        var inventoryArr = [];
        if (args == '') {
            return inventory;
        }
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].title.includes(args.toUpperCase())) {
                inventoryArr.push(inventory[i]);
            }
        }
        return inventoryArr;
    };
    return SearchInventoryPipe;
}());
SearchInventoryPipe = __decorate([
    core_1.Pipe({
        name: 'searchInventory'
    })
], SearchInventoryPipe);
exports.SearchInventoryPipe = SearchInventoryPipe;
//# sourceMappingURL=search.inventory.pipe.js.map