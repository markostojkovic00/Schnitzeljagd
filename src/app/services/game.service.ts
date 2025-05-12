import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/Player';
import { PlayerBuilder } from '../models/PlayerBuilder';
import { LeaderboardEntryBuilder } from '../models/LeaderboardEntryBuilder';
import { Dialog } from '@capacitor/dialog';
import { NavController } from '@ionic/angular';

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

  constructor() {}

  async startGame(playerName: string) {
    this.player = PlayerBuilder.create(playerName);
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

  endGame() {
    if (!this.player) {
      throw new Error('Cannot end game: player is not defined');
    }

    LeaderboardEntryBuilder.create(
      this.player,
      this.time,
      new Date(),
      this.schnitzel,
      this.potatoes
    );
  }
}
