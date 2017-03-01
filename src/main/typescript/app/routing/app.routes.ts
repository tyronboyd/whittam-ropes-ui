import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home.component';

import { LoggedInGuard } from './logged-in-guard';

export const routes: Routes = [{
        path: 'home', component: HomeComponent, canActivate: [], children: []},
];
