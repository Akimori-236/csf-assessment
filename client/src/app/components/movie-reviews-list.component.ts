import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpringbootDataService } from '../services/springboot-data.service';
import { Review } from '../models/review';

@Component({
  selector: 'app-movie-reviews-list',
  templateUrl: './movie-reviews-list.component.html',
  styleUrls: ['./movie-reviews-list.component.css']
})
export class MovieReviewsListComponent implements OnInit, OnDestroy {

  queryParams$!: Subscription
  movieName!: string
  reviewList: Review[] = []

  constructor(
    private activatedRoute: ActivatedRoute,
    private springboot: SpringbootDataService
  ) { }

  ngOnDestroy(): void {
    this.queryParams$.unsubscribe()
  }

  async ngOnInit() {
    this.queryParams$ = this.activatedRoute.queryParams.subscribe(
      (qParams) => {
        this.movieName = qParams['query']
        console.debug("Getting results for.. " + this.movieName
        )
      }
    )
    await this.springboot.search(this.movieName)
      .then(response => {
        this.reviewList = response
        console.debug(response)
      })
  }

}
