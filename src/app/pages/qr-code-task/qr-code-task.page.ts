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
import { RouterLink } from '@angular/router';
import { CapacitorBarcodeScanner } from '@capacitor/barcode-scanner';
import { Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { GameService } from '../../services/game.service';

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
  taskComplete: boolean = false;
  private gameService = inject(GameService);
  private toastController = inject(ToastController);

  constructor() {}

  async showQrScanner() {
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
    await this.gameService.cancelGame();
  }
}
