import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Review } from '../models/review';
import { Comments } from '../models/comment';

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
      this.http.get<Review[]>("/api/search", { params })
    )
  }

  postComment(qp: Comments): Promise<any> {
    const body = new HttpParams()
      .set("movieName", qp.movieName)
      .set("posterName", qp.posterName)
      .set("rating", qp.rating)
      .set("commentText", qp.commentText)

    const headers = new HttpHeaders()
      .set("Content-Type", "application/x-www-form-urlencoded")

    return firstValueFrom(
      this.http.post("/api/comment", body.toString(), { headers })
    )
  }
}