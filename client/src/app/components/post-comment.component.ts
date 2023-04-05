import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SpringbootDataService } from '../services/springboot-data.service';
import { ValidatorFn, AbstractControl, ValidationErrors, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Comments } from '../models/comment';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.css']
})
export class PostCommentComponent implements OnInit, OnDestroy {

  queryParam$!: Subscription
  commentForm!: FormGroup
  selectedTitle!: string
  searchTerm!: string

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private springboot: SpringbootDataService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    this.queryParam$.unsubscribe()
  }

  ngOnInit(): void {
    this.queryParam$ = this.activatedRoute.queryParams.subscribe(
      (queryParams) => {
        this.selectedTitle = queryParams['title']
        this.searchTerm = queryParams['searchTerm']
      }
    )
    this.commentForm = this.fb.group({
      name: this.fb.control<string>('', [Validators.required, this.minCharacterValidator(3)]),
      rating: this.fb.control<number>(3, [Validators.required, Validators.pattern("^[1-5]{1}$")]),
      comment: this.fb.control<string>('', [Validators.required]),
    })
  }

  // Custom Validator creation
  minCharacterValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const searchTerm = control.value.trim()
      return searchTerm.length >= min ? null : { 'InsufficientCharacters': true }
    }
  }

  postComment() {
    const formData = this.commentForm.value
    const requestParams: Comments = {
      movieName: this.selectedTitle,
      posterName: formData['name'],
      rating: formData['rating'],
      commentText: formData['comment']
    }
    this.springboot.postComment(requestParams).then(
      v => this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm }
      })
    )
  }

  back() {
    this.router.navigate(['/search'], {
      queryParams: { query: this.searchTerm }
    })
  }
}
