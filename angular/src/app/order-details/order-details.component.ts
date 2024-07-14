import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../order.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Order } from '../order';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  template: `
    <article class="container-fluid">
      <section class="row mb-4">
        <div class="col-md-6">
          <section class="card p-4">
            <h2 class="card-title">{{ order?.name }}</h2>
          </section>
        </div>
        <div class="col-md-6">
          <section class="card p-4">
            <h2 class="section-heading">Informazioni ordine</h2>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Nome: {{ order?.name }} #{{ order?.id }}</li>
              <li class="list-group-item">Descrizione: {{ order?.description }}</li>
              <li class="list-group-item">Data: {{ order?.date }}</li>
            </ul>
            <h3 *ngIf="order?.products?.length" class="mt-4">Prodotti ({{ order?.products?.length }})</h3>
            <ul *ngIf="order?.products?.length" class="list-group list-group-flush">
              <li *ngFor="let product of order?.products" class="list-group-item">
                Nome: {{ product.name }}, Prezzo: {{ product.price }}
              </li>
            </ul>
          </section>
        </div>
      </section>

      <section class="card p-4">
        <h2 class="section-heading">Aggiorna Ordine</h2>
        <form [formGroup]="orderForm" (ngSubmit)="submitApplication()" class="row g-3">
          <div class="col-md-4">
            <label for="name" class="form-label">Nome:</label>
            <input id="name" formControlName="name" type="text" class="form-control">
          </div>

          <div class="col-md-4">
            <label for="description" class="form-label">Descrizione:</label>
            <input id="description" formControlName="description" type="text" class="form-control">
          </div>

          <div class="col-md-4">
            <label for="date" class="form-label">Data:</label>
            <input id="date" formControlName="date" type="date" class="form-control">
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary">Aggiorna</button>
            <button type="button" (click)="deleteOrder(order!.id)" class="btn btn-danger ms-3">Elimina Ordine</button>
          </div>
        </form>
      </section>
    </article>
  `,
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  route: ActivatedRoute = inject(ActivatedRoute);
  orderService = inject(OrderService);
  order: Order | undefined;

  orderForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    date: new FormControl('')
  });

  constructor() {
    const orderId = parseInt(this.route.snapshot.params['id'], 10);
    this.orderService.getOrderById(orderId).then(order => {
      this.order = order;
      if (order) {
        this.orderForm.setValue({
          name: order.name || '',
          description: order.description || '',
          date: order.date || ''
        });
      }
    });
  }

  async submitApplication() {
    if (this.orderForm.valid && this.order) {
      const updatedOrder: Order = {
        id: this.order.id,
        name: this.orderForm.value.name || '',
        description: this.orderForm.value.description || '',
        date: this.orderForm.value.date || '',
        created_at: this.order.created_at || null,
        updated_at: this.order.updated_at || null,
        products: this.order.products || []
      };
      const result = await this.orderService.updateOrder(updatedOrder);
      if (result) {
        alert('Ordine aggiornato con successo');
        this.order = result;
      } else {
        alert("Si è verificato un errore durante l'aggiornamento dell'ordine");
      }
    }
  }

  async deleteOrder(orderId: number) {
    if (orderId !== undefined) {
      const confirmed = confirm("Sei sicuro di voler eliminare l'ordine?");
      if (confirmed) {
        const deleted = await this.orderService.deleteOrder(orderId);
        if (deleted) {
          alert('Ordine eliminato con successo');
        } else {
          alert("Si è verificato un errore durante l'eliminazione dell'ordine");
        }
      }
    }
  }

}
