import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { StartCardComponent } from '../start-card/start-card.component';

@Component({
  selector: 'app-leaderboard',
  templateUrl: 'leaderboard.page.html',
  styleUrls: ['leaderboard.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, StartCardComponent]
})
export class LeaderboardPage {

  constructor() {}

}
