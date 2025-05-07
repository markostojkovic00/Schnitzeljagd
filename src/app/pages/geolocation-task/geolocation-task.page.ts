import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import type { OverlayEventDetail } from '@ionic/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-geolocation-task',
  templateUrl: './geolocation-task.page.html',
  styleUrls: ['./geolocation-task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonFooter,
    IonAlert,
    IonButton,
    RouterLink,
  ],
})
export class GeolocationTaskPage {
  public alertButtons = [
    {
      text: 'Abbrechen',
      role: 'cancel',
    },
    {
      text: 'Ja',
      role: 'confirm',
    },
  ];

  private routerOutlet = inject(IonRouterOutlet);

  constructor(private navCtrl: NavController) {
    this.routerOutlet.swipeGesture = false;
  }

  leaveGame(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.navCtrl.navigateForward('/tabs/start', {
        animated: true,
        animationDirection: 'back',
      });
    }
  }
}
