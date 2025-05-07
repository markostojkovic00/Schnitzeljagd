import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { PermissionService } from '../../services/permission.service';
import { Dialog } from '@capacitor/dialog';
import { AppLauncher } from '@capacitor/app-launcher';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss'],
  imports: [IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonButton],
})
export class StartCardComponent {
  private router = inject(Router);
  private permissionService = inject(PermissionService);

  async startGame() {
    if (await this.permissionService.arePermissionsGranted()) {
      await this.router.navigate(['/geolocation-task']);
    } else {
      await this.openDialog();
    }
  }

  async openDialog() {
    const { value } = await Dialog.confirm({
      title: 'Berechtigungs-Fehler',
      message: `Es sind nicht alle Berechtigungen gesetzt`,
      okButtonTitle: 'Einstellungen',
      cancelButtonTitle: 'OK',
    });

    if (value) {
      const { id } = await App.getInfo();
      await AppLauncher.openUrl({
        url: `App-prefs:${id}`,
      });
    }
  }
}
