import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { HttpClientModule } from '@angular/common/http';
import { StoreFactory } from './core/store/store.factory';
import { environment } from '../environments/environment';
import { FirebaseConfigModule } from './core/firebase-config/firebase-config.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    FirebaseConfigModule,
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: StoreFactory,
      useFactory: (): StoreFactory =>
        new StoreFactory(window.localStorage, environment.prefix),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
