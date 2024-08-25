import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';

export const routes: Routes = [
    {
        path: 'movies/:movieId',
        component: MovieDetailsComponent,
    },
    {
        path: 'movies',
        component: MovieListComponent,
    },
    {
        path: '',
        redirectTo: '/movies',
        pathMatch: 'full',
    }
];
