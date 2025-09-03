import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'juego',
    loadComponent: () => import('./paginas/juego/juego/juego.page').then( m => m.JuegoPage)
  },
  {
    path: 'configuracion',
    loadComponent: () => import('./paginas/configuracion/configuracion/configuracion.page').then( m => m.ConfiguracionPage)
  },
  {
    path: 'inicio',
    loadComponent: () => import('./paginas/inicio/inicio/inicio.page').then( m => m.InicioPage)
  },
  {
    path: 'finales',
    loadComponent: () => import('./paginas/finales/finales/finales.page').then( m => m.FinalesPage)
  },
  {
    path: 'personajes',
    loadComponent: () => import('./paginas/personajes/personajes/personajes.page').then( m => m.PersonajesPage)
  },
];
