import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
  NavController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { TaskComponent } from '../../components/task/task.component';
import { AlertController } from '@ionic/angular';

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
  ],
})
export class GeolocationTaskPage {
  constructor(
    private alertController: AlertController,
    private navCtrl: NavController
  ) {}

  async presentLeaveGameAlert() {
    const alert = await this.alertController.create({
      header: 'Wollen Sie das Spiel wirklich beenden?',
      buttons: [
        {
          text: 'Nein',
          role: 'cancel',
        },
        {
          text: 'Ja',
          role: 'confirm',
          handler: () => {
            this.navCtrl.navigateForward('/tabs/start', {
              animated: true,
              animationDirection: 'back',
            });
          },
        },
      ],
    });

    await alert.present();
  }
}
