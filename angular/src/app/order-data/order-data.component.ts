import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Order } from '../order';

@Component({
  selector: 'app-data-component',
  standalone: true,
  imports: [RouterModule],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ orderData.name }}</h2>
      <p class="listing-location">{{ orderData.description}}, {{ orderData.date }}</p>
      <a [routerLink]="['/order', orderData.id]" class="btn btn-primary">Scheda Ordine</a>
    </section>
  `,
  styleUrls: ['./order-data.component.css']
})
export class OrderDataComponent {
  @Input() orderData!: Order;
}
