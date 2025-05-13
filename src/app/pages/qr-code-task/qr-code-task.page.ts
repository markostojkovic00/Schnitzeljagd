import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { TaskComponent } from '../../components/task/task.component';
import { Router } from '@angular/router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { GameService } from '../../services/game.service';
import { HapticService } from '../../services/haptic.service';
import { ImpactStyle } from '@capacitor/haptics';
import { ConfettiService } from '../../services/confetti.service';
import { TaskIconComponent } from '../../components/task-icon/task-icon.component';

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
    TaskIconComponent,
  ],
})
export class QrCodeTaskPage {
  title = 'QRious?';
  taskComplete: boolean = false;
  private gameService = inject(GameService);
  private toastController = inject(ToastController);
  private hapticService = inject(HapticService);
  private confettiService = inject(ConfettiService);
  private router = inject(Router);

  async scanQrCode() {
    const { ScanResult } = await CapacitorBarcodeScanner.scanBarcode({
      android: {},
      cameraDirection: undefined,
      hint: Html5QrcodeSupportedFormats.QR_CODE,
      scanButton: false,
      scanInstructions: '',
      scanOrientation: undefined,
      scanText: '',
      web: {},
    });

    if (ScanResult === 'M335@ICT-BZ') {
      await this.hapticService.customHaptic(ImpactStyle.Heavy);
      this.confettiService.celebrate();
      this.taskComplete = true;
      await this.showToast('Der gescannte QR-Code ist korrekt!');
    } else {
      await this.showToast('Der gescannte QR-Code ist falsch.');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      position: 'top',
      color: 'light',
    });
    await toast.present();
  }

  async cancelGame() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    await this.gameService.cancelGame();
  }

  async completeTask() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    this.gameService.completeTask(30_000);
    await this.router.navigate(['/charge-task']);
  }

  async skipTask() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    const isSkipped = await this.gameService.SkipTaskModal();
    if (isSkipped) {
      await this.gameService.skipTask();
      await this.router.navigate(['/charge-task']);
    }
  }
}
