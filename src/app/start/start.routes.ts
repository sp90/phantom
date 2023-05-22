import { Routes } from '@angular/router';

const START_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./home/home.component'),
    data: { revalidate: 0 }
  }
];

export default START_ROUTES as Routes;
