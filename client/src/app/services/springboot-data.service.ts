import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

const SPRINGBOOT_URL = "/api/search"

@Injectable({
  providedIn: 'root'
})
export class SpringbootDataService {

  constructor(private http: HttpClient) { }

  search(movieName: string): Promise<any> {
    let params = new HttpParams()
      .set("query", movieName)

    // send to springboot
    return lastValueFrom(
      this.http.get<any>(SPRINGBOOT_URL, { params })
    )
  }
}