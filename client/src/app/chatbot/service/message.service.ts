import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  url = environment.urlBackend
  constructor(private http: HttpClient) { }

  sendMessage(message: string) {
    return this.http.post(`${this.url}/message`, { prompt: message });
  }
}
