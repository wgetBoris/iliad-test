import { Component } from '@angular/core';
import { OrderDataComponent } from '../order-data/order-data.component';
import { OrderService } from '../order.service';
import { NgFor, NgIf } from '@angular/common';
import { Order, Product } from '../order';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { ClrInputModule, ClrFormsModule } from '@clr/angular';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [OrderDataComponent, NgFor, ReactiveFormsModule, NgIf, ClrInputModule, ClrFormsModule],
  template: `
    <section>
      <div class="container">
        <form [formGroup]="newOrderForm" (ngSubmit)="addOrder()" class="row" clrForm>
          <div class="col-md-6">
            <h3>Nuovo Ordine</h3>
            <div class="form-group">
              <label for="name">Nome:</label>
              <clr-input-container>
                <input id="name" formControlName="name" clrInput type="text">
              </clr-input-container>
            </div>

            <div class="form-group">
              <label for="description">Descrizione:</label>
              <clr-input-container>
                <input id="description" formControlName="description" clrInput type="text">
              </clr-input-container>
            </div>

            <div class="form-group mb-5">
              <label for="date">Data:</label>
              <clr-input-container>
                <input id="date" formControlName="date" clrInput type="date">
              </clr-input-container>
            </div>
            <h4>Associa prodotti all'ordine</h4>

            <div class="form-group">
              <label for="productName">Nome Prodotto:</label>
              <clr-input-container>
                <input id="productName" formControlName="productName" clrInput type="text">
              </clr-input-container>
            </div>

            <div class="form-group">
              <label for="productPrice">Prezzo Prodotto:</label>
              <clr-input-container>
                <input id="productPrice" formControlName="productPrice" clrInput type="number">
              </clr-input-container>
            </div>

            <button type="button" (click)="addProduct()" class="btn btn-outline-primary mt-2">Aggiungi Prodotto</button>

            <h5 class="mt-3">Prodotti da aggiungere:</h5>
            <ul>
              <li *ngFor="let product of newProducts">{{ product.name }} - € {{ product.price }}</li>
            </ul>

            <button type="submit" class="btn btn-success">Crea Ordine</button>
          </div>

          <div class="col-md-6">
          <h3>Cerca Ordine</h3>
            <input type="text" placeholder="Cerca ordine" [formControl]="searchTextControl">
            <section class="results mt-5">
              <div *ngIf="filteredOrderList.length === 0" class="alert alert-warning">Nessun ordine trovato.</div>
              <app-data-component *ngFor="let order of filteredOrderList" [orderData]="order"></app-data-component>
            </section>
          </div>
        </form>
      </div>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  ordersList: Order[] = [];
  filteredOrderList: Order[] = [];
  newOrderForm: FormGroup;
  newProducts: Product[] = [];
  searchTextControl: FormControl;

  constructor(private orderService: OrderService) {
    this.newOrderForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      productName: new FormControl(''),
      productPrice: new FormControl('')
    });

    this.searchTextControl = new FormControl('');

    this.orderService.getAllOrders().then((orders: Order[]) => {
      this.ordersList = orders;
      this.filteredOrderList = orders;
    });

    this.searchTextControl.valueChanges.subscribe(() => {
      this.filterResults();
    });
  }

  async addOrder() {
    if (this.newOrderForm.valid) {
      const newOrder: Order = {
        id: 0,
        name: this.newOrderForm.value.name,
        description: this.newOrderForm.value.description,
        date: this.newOrderForm.value.date,
        created_at: null,
        updated_at: null,
        products: this.newProducts
      };

      console.log(newOrder)
      const addedOrder = await this.orderService.addOrder(newOrder);
      if (addedOrder) {
        alert('Ordine creato correttamente');
        this.ordersList.push(addedOrder);
        this.filteredOrderList.push(addedOrder);
        this.newOrderForm.reset();
        this.newProducts = [];
      } else {
        alert('Errore durante la creazione');
      }
    }
  }

  addProduct() {
    const productName = this.newOrderForm.value.productName;
    const productPrice = this.newOrderForm.value.productPrice;

    if (productName && productPrice) {
      const newProduct: Product = {
        id: 0,
        name: productName,
        price: productPrice,
        order_id: 0,
        created_at: null,
        updated_at: null
      };

      this.newProducts.push(newProduct);
      this.newOrderForm.patchValue({
        productName: '',
        productPrice: ''
      });
    }
  }

  filterResults() {
    const searchText = this.searchTextControl.value.toLowerCase().trim();
    const keywords: string[] = searchText.split(' ').filter((keyword: string) => keyword.trim() !== '');
    const dateFilterStr = this.newOrderForm.value.date?.toString();

    if (keywords.length === 0 && !dateFilterStr) {
      this.filteredOrderList = this.ordersList;
      return;
    }

    this.filteredOrderList = this.ordersList.filter(order => {
      let matchKeywords = true;
      for (const keyword of keywords) {
        matchKeywords = matchKeywords && (
          order.name.toLowerCase().includes(keyword) ||
          order.description.toLowerCase().includes(keyword) ||
          order.date.includes(keyword)
        );
      }

      const matchDateFilter = !dateFilterStr || order.date.includes(dateFilterStr);

      return matchKeywords && matchDateFilter;
    });
  }
}
