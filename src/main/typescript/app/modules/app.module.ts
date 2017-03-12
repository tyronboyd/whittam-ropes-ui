import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { OrderComponent } from '../components/order.component';
import { routes } from '../routing/app.routes';;
import { AppComponent } from '../components/app.component';
import { HomeComponent } from '../components/home.component';
import { OrderService } from '../services/order.service';
import { InventoryService } from '../services/inventory.service';
import { SecureHttpService } from '../services/secure.http.service';
import { WebsocketService } from '../services/websocket.service';
import { ChatService } from '../services/chat.service';

@NgModule({
    imports: [  BrowserModule,
                RouterModule.forRoot(routes),
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
                    deps: [Http]
                }),
                FormsModule
    ],

    declarations: [ AppComponent, HomeComponent, OrderComponent],

    providers: [ TranslateService, OrderService, SecureHttpService, InventoryService, WebsocketService, ChatService ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
