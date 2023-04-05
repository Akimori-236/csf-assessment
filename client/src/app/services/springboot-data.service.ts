import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Review } from '../models/review';

const SPRINGBOOT_URL = "/api/search"

@Injectable({
  providedIn: 'root'
})
export class SpringbootDataService {

  constructor(private http: HttpClient) { }

  search(movieName: string): Promise<Review[]> {
    let params = new HttpParams()
      .set("query", movieName)
    
    // send to springboot
    return lastValueFrom(
      this.http.get<Review[]>(SPRINGBOOT_URL, { params })
    )
  }
}