import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { ConfirmationService } from 'primeng/api';
import { AuthInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes)
    , provideClientHydration()
    , provideHttpClient(withFetch())
    , provideAnimations()
    , ConfirmationService
    , {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ]
};
