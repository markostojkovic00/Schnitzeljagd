import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'geolocation-task',
    loadComponent: () =>
      import('./pages/geolocation-task/geolocation-task.page').then(
        (m) => m.GeolocationTaskPage
      ),
  },
  {
    path: 'shake-task',
    loadComponent: () => import('./pages/shake-task/shake-task.page').then( m => m.ShakeTaskPage)
  },
];
