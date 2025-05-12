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
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';

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
export class ChargeTaskPage {
  private gameService = inject(GameService);

  constructor() {}

  async cancelGame() {
    await this.gameService.cancelGame();
  }
}
