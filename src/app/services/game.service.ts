import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/Player';
import { PlayerBuilder } from '../models/PlayerBuilder';
import { LeaderboardEntryBuilder } from '../models/LeaderboardEntryBuilder';
import { Dialog } from '@capacitor/dialog';
import { NavController } from '@ionic/angular';
import { LeaderboardEntry } from '../models/LearderboardEntry';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private router = inject(Router);
  private navCtrl = inject(NavController);
  player?: Player;
  time = 0;
  schnitzel = 0;
  potatoes = 0;
  gameStart?: Date;
  leaderboardEntry?: LeaderboardEntry;

  constructor() {}

  async startGame(playerName: string) {
    this.player = PlayerBuilder.create(playerName);
    this.gameStart = new Date();
    await this.router.navigate(['/geolocation-task']);
  }

  async cancelGame() {
    const { value } = await Dialog.confirm({
      title: 'Achtung',
      message: 'Möchtest du wirklich das Spiel beenden?',
      okButtonTitle: 'Ja',
      cancelButtonTitle: 'Nein',
    });

    if (value) {
      await this.navCtrl.navigateBack('/tabs/leaderboard');
    }
  }

  completeTask(timeLimitInMilliseconds: number) {
    this.schnitzel += 1;
    if (this.calculateTaskTime() > timeLimitInMilliseconds) {
      this.potatoes += 1;
    }
  }

  calculateTaskTime() {
    if (!this.gameStart) {
      throw new Error('Cannot complete task: game start time is not defined');
    }
    const taskTime =
      new Date().getTime() - this.gameStart.getTime() - this.time;
    this.time += taskTime;
    return taskTime;
  }

  async endGame() {
    if (!this.player) {
      throw new Error('Cannot end game: player is not defined');
    }

    this.leaderboardEntry = LeaderboardEntryBuilder.create(
      this.player,
      this.time,
      new Date(),
      this.schnitzel,
      this.potatoes
    );

    this.resetValues();

    await this.router.navigate(['/result']);
  }

  getLeaderboardEntry() {
    return this.leaderboardEntry;
  }

  private resetValues() {
    this.player = undefined;
    this.time = 0;
    this.schnitzel = 0;
    this.potatoes = 0;
    this.gameStart = undefined;
  }
}
