import { Player } from './Player';

export class PlayerBuilder {
  private static currentId: number = 0;

  public static create(name: string): Player {
    this.currentId++;
    return {
      id: this.currentId,
      name: name,
    };
  }
}
