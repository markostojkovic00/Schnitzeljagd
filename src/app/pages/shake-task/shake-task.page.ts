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
    RouterLink,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ShakeTaskPage {
  private gameService = inject(GameService);

  constructor() {}

  async cancelGame() {
    await this.gameService.cancelGame();
  }
}
