import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

import { HttpClientModule } from '@angular/common/http';
import { FormatDurationPipe } from "../pipes/format-duration/format-duration.pipe";
import { FormatMoneyPipe } from "../pipes/format-money/format-money.pipe";
import { UnsubscribeOnDestroyAdapter } from '../unsubscribe-on-destroy-adapter';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [FormatDurationPipe, FormatMoneyPipe, RouterLink, HttpClientModule],
  providers: [MovieService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent extends UnsubscribeOnDestroyAdapter {
  movie: Movie | undefined;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
    super();
    this.subs.sink = this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('movieId')),
        switchMap(movieId => this.movieService.getMovieDetail(movieId ?? ''))
      ).subscribe(movie => {
        return this.movie = movie;
      });
  }
}
