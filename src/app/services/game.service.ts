import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../models/Player';
import { PlayerBuilder } from '../models/PlayerBuilder';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private router = inject(Router);
  player?: Player;

  constructor() {}

  async startGame(playerName: string) {
    await this.router.navigate(['/geolocation-task']);
    this.player = PlayerBuilder.createPlayer(playerName);
  }
}
