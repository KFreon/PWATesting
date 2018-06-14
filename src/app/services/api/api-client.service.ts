import { Injectable, InjectionToken, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';

export const ApiBaseUrlToken = new InjectionToken('ApiBaseUrl');

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private httpClient: HttpClient,
              @Inject(ApiBaseUrlToken) private apiBaseUrl: string,
              private authService: AuthService) {

  }

  async get<TResponse>(request: string): Promise<TResponse> {
    return this.httpClient.get<TResponse>(`${this.apiBaseUrl}${request}`, {
      headers: {
        'Authorization': `Bearer ${await this.authService.getAccessToken()}`
      }
    }).toPromise();
  }
}