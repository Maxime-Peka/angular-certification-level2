import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movie-filter',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  providers: [MovieService],
  templateUrl: './movie-filter.component.html',
  styleUrl: './movie-filter.component.css',
})
export class MovieFilterComponent {
  title: string = '';
  releaseYear: string = '';

  @Output() movieFilterChanged = new EventEmitter<{
    title: string;
    releaseYear: string;
  }>();

  onMovieFilterChange() {
    this.movieFilterChanged.emit({
      title: this.title,
      releaseYear: this.releaseYear,
    });
  }
}
