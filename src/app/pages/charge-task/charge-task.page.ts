import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TaskComponent } from '../../components/task/task.component';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Device } from '@capacitor/device';

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
export class ChargeTaskPage implements OnInit {
  private gameService = inject(GameService);

  isPhoneCharging: boolean | undefined = false;
  intervalId: any;

  constructor() {}

  async ngOnInit() {
    await this.pollBatteryStatus();
  }

  pollBatteryStatus() {
    this.intervalId = setInterval(async () => {
      const status = await Device.getBatteryInfo();
      this.isPhoneCharging = status.isCharging;
    }, 500);
  }

  async cancelGame() {
    await this.gameService.cancelGame();
  }
}
