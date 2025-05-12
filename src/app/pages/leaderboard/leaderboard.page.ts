import { Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonList,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { LeaderboardEntry } from '../../models/LearderboardEntry';
import { LeaderboardEntryComponent } from '../../components/leaderboard-entry/leaderboard-entry.component';
import { LeaderboardService } from '../../services/leaderboard.service';

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
  private leaderboardService = inject(LeaderboardService);
  title = 'Leaderboard';
  leaderboardEntries?: LeaderboardEntry[];

  async ionViewWillEnter() {
    await this.getLeaderboardEntries();
  }

  async getLeaderboardEntries() {
    this.leaderboardEntries = await this.leaderboardService.getEntries();
  }
}
