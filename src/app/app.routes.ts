import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
        children: [
            {
                path: 'consult',
                loadComponent: () => import('./pages/adr-consult-page/adr-consult-page').then(m => m.AdrConsultPage)
            },
            {
                path: 'register',
                loadComponent: () => import('./pages/adr-register-page/adr-register-page').then(m => m.AdrRegisterPage)
            },]
    },
    { 
        path: '**',
        redirectTo: '/home'
    },
];
