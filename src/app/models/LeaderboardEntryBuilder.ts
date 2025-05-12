import { LeaderboardEntry } from './LearderboardEntry';
import { Player } from './Player';

export class LeaderboardEntryBuilder {
  private static currentId: number = 0;

  public static create(
    player: Player,
    time: number,
    date: Date,
    schnitzel: number,
    potatoes: number
  ): LeaderboardEntry {
    this.currentId++;
    return {
      id: this.currentId,
      player: player,
      time: time,
      date: date,
      schnitzel: schnitzel,
      potatoes: potatoes,
    };
  }
}
