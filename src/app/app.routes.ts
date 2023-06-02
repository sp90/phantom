import { Routes } from '@angular/router';

const APP_ROUTES = [
  {
    path: '',
    redirectTo: '123',
    pathMatch: 'full'
  },
  {
    path: ':id',
    loadComponent: () => import('./home/home.component')
  }
];

export default APP_ROUTES as Routes;
