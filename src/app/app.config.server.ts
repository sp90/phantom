import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { ServerStateInterceptor } from './interceptors/server-transfer.interceptor';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ServerStateInterceptor,
      multi: true
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
