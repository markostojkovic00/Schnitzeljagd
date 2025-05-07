import { Player } from './Player';

export interface LeaderboardEntry {
  id: number;
  player: Player;
  time: number;
  date: Date;
  schnitzel: number;
  potatoes: number;
}
