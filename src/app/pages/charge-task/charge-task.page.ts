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
import { TaskComponent } from '../../components/task/task.component';
import { RouterLink } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-charge-task',
  templateUrl: './charge-task.page.html',
  styleUrls: ['./charge-task.page.scss'],
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
export class ChargeTaskPage {
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
