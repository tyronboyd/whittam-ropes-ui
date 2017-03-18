"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var order_component_1 = require("../components/order.component");
var home_component_1 = require("../components/home.component");
var complete_orders_component_1 = require("../components/complete.orders.component");
exports.routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'orders', component: order_component_1.OrderComponent },
    { path: 'complete-orders', component: complete_orders_component_1.CompleteOrdersComponent }
];
//# sourceMappingURL=app.routes.js.map