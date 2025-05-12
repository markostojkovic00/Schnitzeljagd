import { Component, inject, OnInit } from '@angular/core';
import { IonCard, IonCardContent } from '@ionic/angular/standalone';
import { LeaderboardService } from '../../services/leaderboard.service';
import { LeaderboardEntry } from '../../models/LearderboardEntry';
import { TimeConverterService } from '../../services/time-converter.service';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
  imports: [IonCard, IonCardContent],
})
export class ResultCardComponent implements OnInit {
  private timeConverterService = inject(TimeConverterService);
  private leaderboardService = inject(LeaderboardService);
  leaderboardEntry?: LeaderboardEntry;

  async ngOnInit() {
    await this.getLeaderboardEntry();
  }

  async getLeaderboardEntry() {
    this.leaderboardEntry = await this.leaderboardService.getLastEntry();
  }

  formatTime(milliseconds: number) {
    return this.timeConverterService.formatTime(milliseconds);
  }
}
