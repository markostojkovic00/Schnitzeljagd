import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LeaderboardEntry } from '../../models/LearderboardEntry';
import { LEADERBOARD_ENTRIES } from '../../mock-leaderboard-entries';
import { LeaderboardEntryComponent } from '../../components/leaderboard-entry/leaderboard-entry.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    LeaderboardEntryComponent,
  ],
})
export class LeaderboardPage {
  pageTitle = 'Leaderboard';
  leaderboardEntries: LeaderboardEntry[] = LEADERBOARD_ENTRIES;
}
