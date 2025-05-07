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
import { RouterLink } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { TaskComponent } from '../../components/task/task.component';

@Component({
  selector: 'app-geolocation-task',
  templateUrl: './geolocation-task.page.html',
  styleUrls: ['./geolocation-task.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFooter,
    IonButton,
    RouterLink,
    TaskComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonAlert,
  ],
})
export class GeolocationTaskPage {
  private routerOutlet = inject(IonRouterOutlet);
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
