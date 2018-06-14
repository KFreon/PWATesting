import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserAgentApplication, Logger, LogLevel } from 'msal';

const config = {
  appId: environment.aad.appId,
  authority: `https://login.microsoftonline.com/${environment.aad.tenantId}`,
  defaultScopes: [environment.aad.appId]
};

@Injectable()
export class AuthService {
  private clientApp: UserAgentApplication;

  constructor() {
    const logger = new Logger((logLevel: LogLevel, message: string, piiLoggingEnabled: boolean) => {
      console.log('MSAL log:' + message);
    }, {level: LogLevel.Verbose});

    this.clientApp = new UserAgentApplication(
      config.appId,
      config.authority,
      (errorDesc: string, token: string, error: string, tokenType: 'id_token' | 'access_token') => {
      },
      {
        postLogoutRedirectUri: window.location.origin + '/logout',
        redirectUri: window.location.origin + '/authorize',
        logger: logger,
        cacheLocation: 'sessionStorage'
      });
  }

  login() {
    this.clientApp.loginRedirect(config.defaultScopes);
  }

  public isAuthenticated(): boolean {
    return this.clientApp.getUser() != null;
  }

  public getAccessToken(): Promise<string> {
    if (!this.isAuthenticated()) {
      this.login();
      return Promise.reject('User is not logged in yet.');
    }
    return this.clientApp.acquireTokenSilent(config.defaultScopes).catch(err => {
      this.clientApp.acquireTokenRedirect(config.defaultScopes);
      return Promise.reject('acquireTokenSilent failed, attempting redirect.');
    });
  }
}