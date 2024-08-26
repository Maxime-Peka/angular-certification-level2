import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { Movie } from '../models/movie.model';
import { MovieService } from '../services/movie.service';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { UnsubscribeOnDestroyDirective } from '../directives/unsubscribe-on-destroy-directive';
import { FormatDurationPipe } from "../pipes/format-duration/format-duration.pipe";
import { FormatMoneyPipe } from "../pipes/format-money/format-money.pipe";

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [FormatDurationPipe, FormatMoneyPipe, RouterLink, CommonModule, HttpClientModule],
  providers: [MovieService],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.css'
})
export class MovieDetailsComponent extends UnsubscribeOnDestroyDirective implements OnInit {
  movie: Movie | undefined;

  constructor(private movieService: MovieService, private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    this.subs.sink = this.activatedRoute.paramMap
      .pipe(
        map(params => params.get('movieId')),
        switchMap(movieId => movieId ? this.movieService.getMovieDetail(movieId) : of(undefined)),

      ).subscribe(movie => {
        return this.movie = movie;
      });
  }
}
