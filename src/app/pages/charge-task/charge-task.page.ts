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
import { ImpactStyle } from '@capacitor/haptics';
import { HapticService } from '../../services/haptic.service';
import { ConfettiService } from '../../services/confetti.service';
import { TaskIconComponent } from '../../components/task-icon/task-icon.component';

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
    TaskIconComponent,
  ],
})
export class ChargeTaskPage implements OnInit, OnDestroy {
  title = 'Plug me, Baby';
  private gameService = inject(GameService);
  private hapticService = inject(HapticService);
  private confettiService = inject(ConfettiService);

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
      if (this.isPhoneCharging) {
        await this.hapticService.customHaptic(ImpactStyle.Heavy);
        this.clearInterval();
        this.confettiService.celebrate();
      }
    }, 500);
  }

  async cancelGame() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    await this.gameService.cancelGame();
    this.clearInterval();
  }

  async completeTask() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    this.gameService.completeTask(30_000);
    await this.gameService.endGame();
    this.clearInterval();
  }

  async skipTask() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    await this.gameService.skipTask();
    await this.gameService.endGame();
    this.clearInterval();
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}
