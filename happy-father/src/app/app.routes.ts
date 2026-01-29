import { Routes } from '@angular/router';
import { authGuard, loginGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard]
  },
  {
    path: 'qualities',
    loadComponent: () => import('./pages/qualities/qualities.component').then(m => m.QualitiesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'gallery',
    loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent),
    canActivate: [authGuard]
  },
  {
    path: 'memories',
    loadComponent: () => import('./pages/memories/memories.component').then(m => m.MemoriesComponent),
    canActivate: [authGuard]
  },
  {
    path: 'message',
    loadComponent: () => import('./pages/message/message.component').then(m => m.MessageComponent),
    canActivate: [authGuard]
  },
  {
    path: 'celebration',
    loadComponent: () => import('./pages/celebration/celebration.component').then(m => m.CelebrationComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];
