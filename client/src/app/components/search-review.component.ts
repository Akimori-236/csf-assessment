import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-review',
  templateUrl: './search-review.component.html',
  styleUrls: ['./search-review.component.css']
})
export class SearchReviewComponent implements OnInit{
  searchForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      movieName: this.fb.control<string>('', [Validators.required, this.minCharacterValidator(2)]),
    })
  }

  // Custom Validator creation
  minCharacterValidator(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const searchTerm = control.value.trim()
      return searchTerm.length >= min ? null : { 'InsufficientCharacters': true }
    }
  }


  search() {
    const movieName = this.searchForm.value['movieName']
    console.debug("Searching for.. " + movieName)
    this.router.navigate(['/search'], {
      queryParams: { query: movieName }
    })
  }
}
