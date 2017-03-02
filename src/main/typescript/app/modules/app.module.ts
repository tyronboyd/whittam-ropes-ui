import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, Http } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader, TranslateService, TranslateStaticLoader } from 'ng2-translate/ng2-translate';

import { routes } from '../routing/app.routes';;
import { AppComponent } from '../components/app.component';
import { HomeComponent } from '../components/home.component';


@NgModule({
    imports: [  BrowserModule,
                RouterModule.forRoot(routes),
                TranslateModule.forRoot({
                    provide: TranslateLoader,
                    useFactory: (http: Http) => new TranslateStaticLoader(http, '/assets/i18n', '.json'),
                    deps: [Http]
                }),

    ],

    declarations: [ AppComponent, HomeComponent],

    providers: [ TranslateService ],

    bootstrap: [ AppComponent ]
})
export class AppModule { }
