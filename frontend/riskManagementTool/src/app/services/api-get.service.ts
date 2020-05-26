import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

const rawHttpOptions = {
  headers: httpHeaders,
};


const api = {
  impact: 'impact',
}


@Injectable({
  providedIn: 'root'
})
export class ApiGetService {

  readonly apiAddress = environment.apiAddress;

  constructor(public http: HttpClient) { }

  //todo remove after proper backend API is used
  get(url: string) {
    return this.http.get(url, rawHttpOptions);
  }

  getWithParams(url: string, params: HttpParams) {
    return this.http.get(url, { headers: httpHeaders, params: params });
  }

  //todo remove after proper backend API is used
  getMockWithParams(url: string, params: HttpParams) {
    return this.http.get(url, rawHttpOptions); //ignore params for mock responses from mocky.io
  }

  // TODO: Test api response when .Net API is properly set up
  testApiResponse() {
    return this.http.get(this.apiAddress + api.impact, rawHttpOptions);
  }

  //todo check, adjust, make it work...
  apiPost(endpoint: string, body: any) {
    console.log("posting to: " + this.apiAddress + endpoint)
    return this.http.post<any>(this.apiAddress + endpoint, body, rawHttpOptions);
  }
}
