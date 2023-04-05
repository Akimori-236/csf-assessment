import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SpringbootDataService } from '../services/springboot-data.service';

@Component({
  selector: 'app-movie-reviews-list',
  templateUrl: './movie-reviews-list.component.html',
  styleUrls: ['./movie-reviews-list.component.css']
})
export class MovieReviewsListComponent implements OnInit, OnDestroy {

  queryParams$!: Subscription
  movieName!: string

  constructor(
    private activatedRoute: ActivatedRoute,
    private springboot: SpringbootDataService
  ) { }

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (qParams) => {
        this.movieName = qParams['query']
        console.debug("Getting results for.. " + this.movieName
        )
      }
    )
    this.springboot.search(this.movieName)
      .then(response => console.debug(response))
  }

}
