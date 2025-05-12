import { Component, inject } from '@angular/core';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { PermissionService } from '../../services/permission.service';
import { Dialog } from '@capacitor/dialog';
import { GameService } from '../../services/game.service';
import { HapticService } from '../../services/haptic.service';
import { ImpactStyle } from '@capacitor/haptics';

@Component({
  selector: 'app-start-card',
  templateUrl: './start-card.component.html',
  styleUrls: ['./start-card.component.scss'],
  imports: [IonCard, IonCardContent, IonCardSubtitle, IonCardHeader, IonButton],
})
export class StartCardComponent {
  private permissionService = inject(PermissionService);
  private gameService = inject(GameService);
  private hapticService = inject(HapticService);

  async startGame() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
    if (await this.permissionService.arePermissionsGranted()) {
      await this.openNameDialog();
    } else {
      await this.openPermissionsDialog();
    }
  }

  private async openPermissionsDialog() {
    const { value } = await Dialog.confirm({
      title: 'Berechtigungs-Fehler',
      message: 'Es sind nicht alle Berechtigungen gesetzt',
      okButtonTitle: 'Einstellungen',
      cancelButtonTitle: 'OK',
    });

    if (value) {
      await this.permissionService.openPermissionSettings();
    }
  }

  private async openNameDialog() {
    const dialogResult = await Dialog.prompt({
      title: 'Spiel Start',
      message: 'Gib deinen Namen ein',
      okButtonTitle: 'OK',
      cancelButtonTitle: 'Abbrechen',
      inputPlaceholder: 'Name',
    });

    if (!dialogResult.cancelled) {
      await this.gameService.startGame(dialogResult.value);
    }
  }
}
