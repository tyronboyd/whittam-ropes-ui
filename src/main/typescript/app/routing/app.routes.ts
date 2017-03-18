import { Routes } from '@angular/router';
import { OrderComponent } from '../components/order.component';
import { HomeComponent } from '../components/home.component';
import { CompleteOrdersComponent } from '../components/complete.orders.component';



export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrderComponent },
  { path: 'complete-orders', component: CompleteOrdersComponent }
];
