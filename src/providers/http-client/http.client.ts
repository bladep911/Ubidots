import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

//import {Observable} from 'rxjs/Rx';

@Injectable()
export class HttpClient {

    constructor(private http: Http) {
    }

    private addTokenHeader(headers: Headers, token): void {
        if (token == null) return;
        headers.append('X-Auth-Token', token);
    }

    public get(url, token = null, onSuccess: (r: any) => void) {
        let headers = new Headers();
        this.addTokenHeader(headers, token);
        return this.http.get(url, {
            headers: headers
        }).subscribe(
            response => {
                onSuccess(response)
            },
            err => {
                console.log(`GET: ${url} - error: `, err);
            }
        );
    }

    public post(url, data, token = null, onSuccess: (r: any) => void) {
        let headers = new Headers();
        this.addTokenHeader(headers, token);
        return this.http.post(url, data, {
            headers: headers
        }).subscribe(
            response => {
                onSuccess(response)
            },
            err => {
                console.log(`GET: ${url} - error: `, err);
            }
        );
    }
}
