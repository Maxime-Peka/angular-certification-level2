import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = '/movies';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map(movies => movies.map(movie => ({
        ...movie,
        releaseDate: movie.release_date,
      })))
    );
  }

  getMovieDetail(id: string): Observable<Movie> {
    return this.http.get<any>(this.baseUrl + '/' + id).pipe(
      map(movie => ({
        ...movie,
        releaseDate: movie.release_date,
        boxOffice: movie.box_office
      }))
    );
  }
}
