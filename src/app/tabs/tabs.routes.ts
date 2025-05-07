import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'start',
        loadComponent: () =>
          import('../pages/start/start.page').then((m) => m.StartPage),
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
          import('../pages/leaderboard/leaderboard.page').then(
            (m) => m.LeaderboardPage,
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/start',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/start',
    pathMatch: 'full',
  },
];
