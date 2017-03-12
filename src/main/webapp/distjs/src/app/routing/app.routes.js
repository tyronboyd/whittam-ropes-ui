"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_component_1 = require("../components/order.component");
var home_component_1 = require("../components/home.component");
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'orders', component: order_component_1.OrderComponent }
];
//# sourceMappingURL=app.routes.js.map