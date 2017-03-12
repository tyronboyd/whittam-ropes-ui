import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class SecureHttpService {
    constructor(private http: Http) { }

    get(url: string, queryParams: URLSearchParams) {
        return this.getWithHeaders(url, queryParams, new Headers());
    }

    getWithHeaders(url: string, queryParams: URLSearchParams, headers: Headers) {
        let requestOptionsArgs = {
            search: queryParams,
            headers: headers
        }
        return this.http.get(url, requestOptionsArgs)
            .map((res) => {
                try {
                    return res.json();
                 }
                catch (err) {
                    return res;
                }
            }).catch((err: Response, caught: Observable<Object>) => {

                return Observable.throw(err);
            });
    }

    post(url: string, bodyJson: string) {
        return this.postWithHeaders(url, bodyJson, new Headers());
    }

    postWithHeaders(url: string, bodyJson: string, headers: Headers) {
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, bodyJson, options)
            .map((res) => {
                return res;
            })
            .catch((err: Response, caught: Observable<Object>) => {

                return Observable.throw(err);
            });
    }

    delete(url: string, queryParams: URLSearchParams, bodyJson: string) {
        return this.deleteWithHeaders(url, queryParams, bodyJson, new Headers());
    }

    deleteWithHeaders(url: string, queryParams: URLSearchParams, bodyJson: string, headers: Headers) {
        let requestOptionsArgs = {
            search: queryParams,
            headers: headers,
            body: bodyJson
        }

        return this.http.delete(url, requestOptionsArgs)
            .map((res) => {
                return res;
            }).catch((err: Response, caught: Observable<Object>) => {

                return Observable.throw(err);
            });
    }

    put(url: string, queryParams: URLSearchParams, bodyJson: string) {
      return this.putWithHeaders(url, queryParams, bodyJson, new Headers());
    }

    putWithHeaders(url: string, queryParams: URLSearchParams, bodyJson: string, headers: Headers) {
      let options = new RequestOptions({ headers: headers, search: queryParams });
      return this.http.put(url, bodyJson, options)
      .map((res) => {
        return res
      }).catch((err: Response, caught: Observable<Object>) => {

          return Observable.throw(err);
      });
    }

    patchWithHeaders(url: string, bodyJson: string, headers: Headers) {
        let options = new RequestOptions({ headers: headers });

        return this.http.patch(url, bodyJson, options)
            .map((res) => {
                return res.json();
            })
            .catch((err: Response, caught: Observable<Object>) => {

                return Observable.throw(err);
            });
    }
}
