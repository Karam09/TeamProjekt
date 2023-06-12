import { HttpClient } from '@angular/common/http';
import {InitializeService } from './InitializeService';

import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule
} from '@ngneat/transloco';
import { Injectable, isDevMode, NgModule } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  testVar = 'some value';
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`/assets/i18n/${lang}.json`);
  }
}

export function initialize(initializeService: InitializeService) {
  return initializeService.initialize();
}

const lang = localStorage.getItem('selectedLanguage') ;
@NgModule({
  exports: [ TranslocoModule ],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'de'],
        defaultLang: 'en' ,
        // Remove this option if your application
        // doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      })
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader }
  ]
})
export class TranslocoRootModule {}