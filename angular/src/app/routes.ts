import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { OrderDetailsComponent } from './order-details/order-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Home page'
  },
  {
    path: 'order/:id',
    component: OrderDetailsComponent,
    title: 'Order details'
  }
];

export default routes;
