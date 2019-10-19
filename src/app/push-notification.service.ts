import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './home/Product';

const SERVER_URL = 'http://localhost:3000/subscription'
const SERVER_URL_SEND = 'http://localhost:3000/sendNotification'

@Injectable()
export class PushNotificationService {
  constructor(private http: HttpClient) {}

  public sendSubscriptionToTheServer(subscription: PushSubscription) {
    return this.http.post(SERVER_URL, subscription)
  }

  public sendNotificationToTheServer(product: Product) {
    return this.http.post(SERVER_URL_SEND, product)
  }
}