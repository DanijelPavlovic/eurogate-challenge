import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import Aura from '@primeng/themes/aura';

import {routes} from './app.routes';
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {providePrimeNG} from "primeng/config";
import {MessageService} from "primeng/api";
import {provideHttpClient} from "@angular/common/http";
import {provideClientHydration, withEventReplay} from "@angular/platform-browser";

export const appConfig: ApplicationConfig = {
    providers: [
        MessageService,
        provideZoneChangeDetection({eventCoalescing: true}),
        provideClientHydration(withEventReplay()),
        provideRouter(routes),
        provideAnimationsAsync(),
        provideHttpClient(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.my-app-dark',
                    cssLayer: {
                        name: 'primeng',
                        order: 'theme, base, primeng'
                    }
                }
            }
        })
    ]
};
