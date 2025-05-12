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
import { Router } from '@angular/router';
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
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
  ],
})
export class ShakeTaskPage {
  private gameService = inject(GameService);
  private router = inject(Router);

  constructor() {}

  async cancelGame() {
    await this.gameService.cancelGame();
  }
  async completeTask() {
    this.gameService.completeTask(30_000);
    await this.router.navigate(['/qr-code-task']);
  }
}
