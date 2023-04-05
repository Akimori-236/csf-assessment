import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const SPRINGBOOT_URL = "/api/something"

@Injectable({
  providedIn: 'root'
})
export class SpringbootDataService {

  constructor(private http: HttpClient) { }

  getSB(): Promise<any> {
    let params = new HttpParams()

    // send to springboot
    return lastValueFrom(
      this.http.get<any>(SPRINGBOOT_URL, { params })
    )
  }
}