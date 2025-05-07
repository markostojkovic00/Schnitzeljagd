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
import { TaskComponent } from '../../components/task/task.component';
import { RouterLink } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';

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
    IonAlert,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ShakeTaskPage {
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
