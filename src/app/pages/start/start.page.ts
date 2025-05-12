import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { StartCardComponent } from '../../components/start-card/start-card.component';
import { PermissionService } from '../../services/permission.service';

@Component({
  selector: 'app-start',
  templateUrl: 'start.page.html',
  styleUrls: ['start.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, StartCardComponent],
})
export class StartPage {
  private permissionService = inject(PermissionService);
  title = 'Schnitzeljagd';

  async ionViewDidEnter() {
    await this.permissionService.requestCameraPermissions();
    await this.permissionService.requestGeolocationPermissions();
  }
}
