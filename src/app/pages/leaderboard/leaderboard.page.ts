import { Component, inject, OnInit } from '@angular/core';
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
export class LeaderboardPage implements OnInit {
  private leaderboardService = inject(LeaderboardService);
  title = 'Leaderboard';
  leaderboardEntries?: LeaderboardEntry[];

  async ngOnInit() {
    await this.getLeaderboardEntries();
  }

  async getLeaderboardEntries() {
    this.leaderboardEntries = await this.leaderboardService.getEntries();
  }
}
