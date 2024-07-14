import { Injectable } from '@angular/core';
import { Order } from './order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url = 'http://localhost:8000/api/orders'

  async getAllOrders(): Promise<Order[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async addOrder(order: Order): Promise<Order | undefined> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    return response.ok ? await response.json() : undefined;
  }

  async updateOrder(order: Order): Promise<Order | undefined> {
    const response = await fetch(`${this.url}/${order.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order)
    });

    return response.ok ? await response.json() : undefined;
  }

  async deleteOrder(id: number): Promise<boolean> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE'
    });

    return response.ok;
  }

  constructor() { }
}
