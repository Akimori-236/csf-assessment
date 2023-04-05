import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-review',
  templateUrl: './search-review.component.html',
  styleUrls: ['./search-review.component.css']
})
export class SearchReviewComponent {
  searchForm!: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      movieName: this.fb.control<string>('', [Validators.required, Validators.minLength(2)]),
    })
  }

}
