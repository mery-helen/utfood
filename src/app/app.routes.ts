import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { CardapioComponent } from './pages/cardapio/cardapio';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard';
import { authGuard, adminGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cardapio',
    component: CardapioComponent,
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [authGuard, adminGuard],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];
