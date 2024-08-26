import { Routes } from '@angular/router';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

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
    },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];
