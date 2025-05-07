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
import { AlertController } from '@ionic/angular';
import { TaskComponent } from '../../components/task/task.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-qr-code-task',
  templateUrl: './qr-code-task.page.html',
  styleUrls: ['./qr-code-task.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButton,
    TaskComponent,
    IonFooter,
    RouterLink,
  ],
})
export class QrCodeTaskPage {
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
