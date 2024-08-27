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
    return this.http.get<Movie[]>(this.baseUrl).pipe(
      map(movies => movies)
    );
  }

  getMovieDetail(id: string): Observable<Movie | undefined> {
    return this.http.get<Movie | undefined>(this.baseUrl + '/' + id).pipe(
      map(movie => movie ? movie : undefined)
    );
  }
}
