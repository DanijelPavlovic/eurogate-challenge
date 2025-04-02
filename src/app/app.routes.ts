import { Routes } from '@angular/router';
import {DefaultLayoutComponent} from './core/layouts/default-layout/default-layout.component';
import {PageNotFoundComponent} from './core/components/page-not-found/page-not-found.component';

export const routes: Routes = [
  {path: '', redirectTo: 'chocolates', pathMatch: 'full'},
  {
    path: '',
    component: DefaultLayoutComponent,
    children: [
      {
        path: 'chocolates',
        loadComponent: () => import('./chocolates/chocolates.component').then(c => c.ChocolatesComponent),
      },
      {
        path: 'chocolate/:id',
        loadComponent: () => import('./chocolates/components/chocolate-details/chocolate-details.component').then(c => c.ChocolateDetailsComponent),
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
