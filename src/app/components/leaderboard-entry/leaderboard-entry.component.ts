import { Component, inject, input } from '@angular/core';
import { LeaderboardEntry } from '../../models/LearderboardEntry';
import { IonChip, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { TimeConverterService } from '../../services/time-converter.service';

@Component({
  selector: 'app-leaderboard-entry',
  templateUrl: './leaderboard-entry.component.html',
  styleUrls: ['./leaderboard-entry.component.scss'],
  imports: [IonItem, IonLabel, IonChip, IonNote],
})
export class LeaderboardEntryComponent {
  private timeConverterService = inject(TimeConverterService);
  entry = input<LeaderboardEntry | undefined>(undefined);

  formatTime(milliseconds: number) {
    return this.timeConverterService.formatTime(milliseconds);
  }
}
