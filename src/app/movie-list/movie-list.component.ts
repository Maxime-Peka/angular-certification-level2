import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { combineLatest, Observable, of, startWith } from 'rxjs';
import { Movie } from '../models/movie.model';

import { MovieFilterComponent } from "../movie-filter/movie-filter.component";
import { FormatDurationPipe } from "../pipes/format-duration/format-duration.pipe";
import { FormatMoneyPipe } from "../pipes/format-money/format-money.pipe";
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [FormatDurationPipe, FormatMoneyPipe, MovieFilterComponent, CommonModule, RouterLink],
  providers: [MovieService],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies$: Observable<Movie[]> | undefined;
  filteredMovies$: Observable<Movie[]> | undefined;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.filteredMovies$ = this.movies$ = this.movieService.getMovies();
  }


  filterMovies(titleFilterText: string, releaseYearFilterText: string) {

    const searchTitle$ = of(titleFilterText).pipe(startWith(''));
    const searchYear$ = of(releaseYearFilterText).pipe(startWith(''));


    if (this.movies$) {
      this.filteredMovies$ = combineLatest(this.movies$, searchTitle$, searchYear$,
        (movies, filterTitle, filterYear) => {
          return movies.filter(movie => {

            //Conditions
            let filterTitleCondition = (filterTitle && filterTitle.length > 1) ? true : false;
            let filterYearCondition = filterYear;

            // Matches
            const matchesTitle = movie.title.toLowerCase().includes(filterTitle.toLowerCase());
            const matchesYear = movie.releaseDate.startsWith(filterYear);

            if (filterTitleCondition && filterYearCondition) {
              return true;
            }
            else if (filterTitleCondition && !filterYearCondition) {
              return matchesTitle;
            } else if (!filterTitleCondition && filterYearCondition) {
              return matchesYear;
            }
            return true;
          })
        })
    }
  }

}
