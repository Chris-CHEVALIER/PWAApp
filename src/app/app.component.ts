import { Component } from '@angular/core';
import { SwPush } from '@angular/service-worker'
import { PushNotificationService } from './push-notification.service'

const VAPID_PUBLIC = "BAHBSJAtPMXlX4ou50z-Bwlfdlyzyz26QgUDGmyLHT04E3Sjls-yvNdXdhsXJGTufxBp3NnQs81omm4HJHzAPUQ";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAngularTest';

  constructor(swPush: SwPush, pushService: PushNotificationService) {
    if (swPush.isEnabled) {
      swPush
        .requestSubscription({
          serverPublicKey: VAPID_PUBLIC,
        })
        .then(subscription => {
          pushService.sendSubscriptionToTheServer(subscription).subscribe();
        })
        .catch(console.error)
    }
  }
}