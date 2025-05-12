import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
  ],
})
export class ChargeTaskPage implements OnInit, OnDestroy {
  private gameService = inject(GameService);

  isPhoneCharging: boolean | undefined = false;
  intervalId: any;

  ngOnInit() {
    this.pollBatteryStatus();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
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
  async completeTask() {
    this.gameService.completeTask(30_000);
    await this.gameService.endGame();
  }

  async skipTask() {
    await this.gameService.endGame();
  }
}
