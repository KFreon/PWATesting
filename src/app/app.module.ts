import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.routes';
import { CharactersComponent } from './routes/characters/characters.component';
import { ApiBaseUrlToken, ApiClientService } from './services/api/api-client.service';
import { AuthService } from './services/auth/auth.service';
import { AuthorizeComponent } from './routes/authorize/authorize.component';
import { LogoutComponent } from './routes/logout/logout.component';
import { RequireAuthGuard } from './guards/require-auth/require-auth.guard';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CharacterComponent } from './routes/character/character.component';
import { OriginsComponent } from './routes/origins/origins.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    AuthorizeComponent,
    LogoutComponent,
    CharacterComponent,
    OriginsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AuthService, ApiClientService, RequireAuthGuard, HttpClient,
    { provide: ApiBaseUrlToken, useValue: "http://localhost:54155" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
