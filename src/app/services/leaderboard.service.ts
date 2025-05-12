import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { LeaderboardEntry } from '../models/LearderboardEntry';

type SerializedLeaderboardEntry = Omit<LeaderboardEntry, 'date'> & {
  date: string;
};

@Injectable({
  providedIn: 'root',
})
export class LeaderboardService {
  private readonly storageKey = 'leaderboardEntries';

  async saveEntry(entry: LeaderboardEntry) {
    const entries = await this.getEntries();
    entries.push(entry);
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(entries),
    });
  }

  async getEntries(): Promise<LeaderboardEntry[]> {
    const { value } = await Preferences.get({ key: this.storageKey });
    return value
      ? (JSON.parse(value) as SerializedLeaderboardEntry[]).map((entry) => ({
          ...entry,
          date: new Date(entry.date),
        }))
      : [];
  }

  async getLastEntry(): Promise<LeaderboardEntry | undefined> {
    const entries = await this.getEntries();
    return entries.length ? entries[entries.length - 1] : undefined;
  }
}
