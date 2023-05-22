import { Routes } from '@angular/router';

const START_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./home/home.component')
  }
];

export default START_ROUTES as Routes;
