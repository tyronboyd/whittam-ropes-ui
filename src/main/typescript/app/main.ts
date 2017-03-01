import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './modules/app.module';
import {enableProdMode} from '@angular/core';

const platform = platformBrowserDynamic();
enableProdMode();
platform.bootstrapModule(AppModule);