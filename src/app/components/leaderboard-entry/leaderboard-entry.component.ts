import { Component, input } from '@angular/core';
import { LeaderboardEntry } from '../../models/LearderboardEntry';
import { IonChip, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';

@Component({
  selector: 'app-leaderboard-entry',
  templateUrl: './leaderboard-entry.component.html',
  styleUrls: ['./leaderboard-entry.component.scss'],
  imports: [IonItem, IonLabel, IonChip, IonNote],
})
export class LeaderboardEntryComponent {
  entry = input<LeaderboardEntry | undefined>(undefined);

  constructor() {}

  formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min ${secs}sec`;
  }
}
