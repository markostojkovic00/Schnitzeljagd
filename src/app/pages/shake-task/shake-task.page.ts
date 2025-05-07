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
  selector: 'app-shake-task',
  templateUrl: './shake-task.page.html',
  styleUrls: ['./shake-task.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonFooter,
    TaskComponent,
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ShakeTaskPage {
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
