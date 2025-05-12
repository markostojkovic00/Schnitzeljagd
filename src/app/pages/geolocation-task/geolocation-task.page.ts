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
import { Router } from '@angular/router';
import { TaskComponent } from '../../components/task/task.component';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-geolocation-task',
  templateUrl: './geolocation-task.page.html',
  styleUrls: ['./geolocation-task.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonFooter,
    IonButton,
    TaskComponent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class GeolocationTaskPage {
  title = 'Aufgabe 1';
  private gameService = inject(GameService);
  private router = inject(Router);

  async cancelGame() {
    await this.gameService.cancelGame();
  }
  async completeTask() {
    this.gameService.completeTask(30_000);
    await this.router.navigate(['/shake-task']);
  }
}
