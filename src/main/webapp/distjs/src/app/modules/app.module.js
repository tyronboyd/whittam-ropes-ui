"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var ng2_translate_1 = require("ng2-translate/ng2-translate");
var order_component_1 = require("../components/order.component");
var app_routes_1 = require("../routing/app.routes");
;
var app_component_1 = require("../components/app.component");
var home_component_1 = require("../components/home.component");
var complete_orders_component_1 = require("../components/complete.orders.component");
var order_service_1 = require("../services/order.service");
var inventory_service_1 = require("../services/inventory.service");
var secure_http_service_1 = require("../services/secure.http.service");
var websocket_service_1 = require("../services/websocket.service");
var chat_service_1 = require("../services/chat.service");
var search_inventory_pipe_1 = require("../pipes/search.inventory.pipe");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule,
            router_1.RouterModule.forRoot(app_routes_1.routes),
            ng2_translate_1.TranslateModule.forRoot({
                provide: ng2_translate_1.TranslateLoader,
                useFactory: function (http) { return new ng2_translate_1.TranslateStaticLoader(http, '/assets/i18n', '.json'); },
                deps: [http_1.Http]
            }),
            forms_1.FormsModule
        ],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, order_component_1.OrderComponent, search_inventory_pipe_1.SearchInventoryPipe, complete_orders_component_1.CompleteOrdersComponent],
        providers: [ng2_translate_1.TranslateService, order_service_1.OrderService, secure_http_service_1.SecureHttpService, inventory_service_1.InventoryService, websocket_service_1.WebsocketService, chat_service_1.ChatService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map