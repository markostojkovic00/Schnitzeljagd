import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonAlert, IonButton, IonContent, IonFooter, IonHeader, IonTitle, IonToolbar,} from '@ionic/angular/standalone';
import {Router, RouterLink} from "@angular/router";
import type {OverlayEventDetail} from '@ionic/core';

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
    IonButton,
    IonFooter,
    RouterLink,
    IonAlert,
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

  constructor(private router: Router) {
  }

  leaveGame(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.router.navigate(['/tabs/start']);
    }
  }
}
