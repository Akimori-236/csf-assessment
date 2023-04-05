import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchReviewComponent } from './components/search-review.component';
import { MovieReviewsListComponent } from './components/movie-reviews-list.component';

const routes: Routes = [
  { path: '', component: SearchReviewComponent },
  { path: 'search', component: MovieReviewsListComponent },
  { path: '**', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
