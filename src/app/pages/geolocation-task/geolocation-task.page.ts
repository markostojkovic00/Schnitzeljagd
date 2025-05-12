import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TaskComponent } from '../../components/task/task.component';
import { GameService } from '../../services/game.service';
import { Geolocation, Position } from '@capacitor/geolocation';

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
    IonLabel,
  ],
})
export class GeolocationTaskPage implements OnInit, OnDestroy {
  private gameService = inject(GameService);
  private router = inject(Router);

  private watchId: string | null = null;
  distance = signal(0);
  taskComplete: boolean = false;

  async ngOnInit() {
    this.watchId = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        minimumUpdateInterval: 1000,
      },
      (position: Position | null) => {
        this.distance.set(
          this.haversineDistance(
            {
              latitude: position?.coords.latitude!,
              longitude: position?.coords.longitude!,
            },
            {
              latitude: 47.027585,
              longitude: 8.300941,
            }
          )
        );
        if (this.distance() <= 5) {
          this.taskComplete = true;
        }
      }
    );
  }

  async ngOnDestroy() {
    if (this.watchId !== null) {
      await Geolocation.clearWatch({ id: this.watchId });
    }
  }

  haversineDistance(
    coords1: { latitude: number; longitude: number },
    coords2: { latitude: number; longitude: number }
  ) {
    const R = 6371e3; // Earth's radius in meters
    const lat1Rad = coords1.latitude * (Math.PI / 180);
    const lat2Rad = coords2.latitude * (Math.PI / 180);
    const deltaLat = (coords2.latitude - coords1.latitude) * (Math.PI / 180);
    const deltaLon = (coords2.longitude - coords1.longitude) * (Math.PI / 180);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1Rad) *
        Math.cos(lat2Rad) *
        Math.sin(deltaLon / 2) *
        Math.sin(deltaLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // Distance in meters
  }

  async cancelGame() {
    await this.gameService.cancelGame();
  }

  async completeTask() {
    this.gameService.completeTask(30_000);
    await this.router.navigate(['/shake-task']);
  }

  async skipTask() {
    await this.router.navigate(['/charge-task']);
  }
}
