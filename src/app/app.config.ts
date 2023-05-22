import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import APP_ROUTES from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(APP_ROUTES), provideHttpClient(), provideClientHydration()]
};
