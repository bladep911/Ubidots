import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  private addTokenHeader(headers: Headers, token): void {
    if(token == null) return;
    headers.append('X-Auth-Token', token);
  }

  public get(url, token=null) {
    let headers = new Headers();
    this.addTokenHeader(headers, token);
    return this.http.get(url, {
      headers: headers
    });
  }

  public post(url, data, token=null) {
    let headers = new Headers();
    this.addTokenHeader(headers, token);
    return this.http.post(url, data, {
      headers: headers
    });
  }
}
