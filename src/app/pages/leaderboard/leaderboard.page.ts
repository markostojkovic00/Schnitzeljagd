import { Component } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class LeaderboardPage {
  pageTitle = 'Leaderboard';

  constructor() {}
}
