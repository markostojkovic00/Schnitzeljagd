import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonProgressBar,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { TaskComponent } from '../../components/task/task.component';
import { Router } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Motion } from '@capacitor/motion';
import { ImpactStyle } from '@capacitor/haptics';
import { HapticService } from '../../services/haptic.service';
import { ConfettiService } from '../../services/confetti.service';
import { TaskIconComponent } from '../../components/task-icon/task-icon.component';

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
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonProgressBar,
    TaskIconComponent,
  ],
})
export class ShakeTaskPage implements OnInit {
  title = 'Shake it!';
  private gameService = inject(GameService);
  private router = inject(Router);
  private hapticService = inject(HapticService);
  private confettiService = inject(ConfettiService);

  private shakeListener: any;
  progress = signal(0);
  private lastShake = Date.now();

  async ngOnInit() {
    await this.detectShake();
  }

  async detectShake() {
    this.shakeListener = await Motion.addListener('accel', async (event) => {
      const { x, y, z } = event.acceleration ?? { x: 0, y: 0, z: 0 };
      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const now = Date.now();

      if (acceleration > 12 && now - this.lastShake > 800) {
        this.lastShake = now;

        const newProgress = Math.min(this.progress() + 10, 100);
        this.progress.set(newProgress);

        let shakeCount: number;
        let intensity: ImpactStyle;
        let delay: number;

        if (newProgress < 40) {
          shakeCount = 5;
          intensity = ImpactStyle.Light;
          delay = 150;
        } else if (newProgress < 80) {
          shakeCount = 5;
          intensity = ImpactStyle.Medium;
          delay = 100;
        } else {
          shakeCount = 5;
          intensity = ImpactStyle.Heavy;
          delay = 100;
        }
        await this.vibrateMultiple(shakeCount, intensity, delay);
        if (newProgress >= 100) {
          await this.hapticService.customHaptic(ImpactStyle.Heavy);
          this.shakeListener.remove();
          this.confettiService.celebrate();
        }
      }
    });
  }
  async cancelGame() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    if (this.shakeListener) {
      this.shakeListener.remove();
    }
    await this.gameService.cancelGame();
  }

  async completeTask() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    if (this.shakeListener) {
      this.shakeListener.remove();
    }
    this.gameService.completeTask(30_000);
    await this.router.navigate(['/qr-code-task']);
  }

  async skipTask() {
    if (this.shakeListener) {
      this.shakeListener.remove();
    }
    await this.hapticService.customHaptic(ImpactStyle.Light);
    await this.gameService.skipTask();
    await this.router.navigate(['/qr-code-task']);
  }

  async vibrateMultiple(times: number, intensity: ImpactStyle, delay: number) {
    for (let i = 0; i < times; i++) {
      await this.hapticService.customHaptic(intensity);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}
