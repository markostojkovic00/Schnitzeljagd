import { LeaderboardEntry } from './models/LearderboardEntry';

export const LEADERBOARD_ENTRIES: LeaderboardEntry[] = [
  {
    id: 1,
    player: { id: 1, name: 'Laurin' },
    time: 120,
    date: new Date('2025-05-07'),
    schnitzel: 4,
    potatoes: 1,
  },
  {
    id: 2,
    player: { id: 2, name: 'Marko' },
    time: 80,
    date: new Date('2025-05-07'),
    schnitzel: 4,
    potatoes: 0,
  },
  {
    id: 3,
    player: { id: 3, name: 'Leon' },
    time: 80,
    date: new Date('2025-05-06'),
    schnitzel: 3,
    potatoes: 0,
  },
];
