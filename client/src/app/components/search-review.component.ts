import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-review',
  templateUrl: './search-review.component.html',
  styleUrls: ['./search-review.component.css']
})
export class SearchReviewComponent {
  searchForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      movieName: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
    })
  }

  search() {
    const movieName = this.searchForm.value['movieName']
    console.debug("Searching for.. " + movieName)
    this.router.navigate(['/search'], {
      queryParams: { query: movieName }
    })
  }
}
