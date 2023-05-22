import { Routes } from '@angular/router';

const APP_ROUTES = [
  {
    path: '',
    loadComponent: () => import('./components/start/start-layout/start-layout.component'),
    loadChildren: () => import('./start/start.routes')
  }
];

export default APP_ROUTES as Routes;
