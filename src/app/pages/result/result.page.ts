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
} from '@ionic/angular/standalone';
import { TaskComponent } from '../../components/task/task.component';
import { ResultCardComponent } from '../../components/result-card/result-card.component';
import { RouterLink } from '@angular/router';
import { ImpactStyle } from '@capacitor/haptics';
import { HapticService } from '../../services/haptic.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TaskComponent,
    ResultCardComponent,
    IonButton,
    IonFooter,
    RouterLink,
  ],
})
export class ResultPage {
  private hapticService = inject(HapticService);

  title = 'Resultat';

  async hapticFeedback() {
    await this.hapticService.customHaptic(ImpactStyle.Light);
  }
}
