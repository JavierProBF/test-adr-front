import { Routes } from '@angular/router';

export const routes: Routes = [
    // Redirige la ruta raíz a /home
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    // Página principal
    {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage)
    },
    // Página de consulta
    {
        path: 'consult',
        loadComponent: () => import('./pages/adr-consult-page/adr-consult-page').then(m => m.AdrConsultPage)
    },
    // Página de registro
    {
        path: 'register',
        loadComponent: () => import('./pages/adr-register-page/adr-register-page').then(m => m.AdrRegisterPage)
    },
    {
        path: 'adrdetails',
        loadComponent: () => import('./pages/adr-detail/adr-detail').then(m => m.AdrDetail)
    },
    {
        path: 'listTasks',
        loadComponent: () => import('./pages/list-task-page/list-task-page').then(m => m.ListTaskPage)
    },
    {
        path: 'dashboardtasks',
        loadComponent: () => import('./pages/dashboard-task/dashboard-task').then(m => m.DashboardTask)
    },
    {
        path: 'detailUser',
        loadComponent: () => import('./pages/detail-user-page/detail-user-page').then(m => m.DetailUserPage)
    },
    {
        path: 'report',
        loadComponent: () => import('./pages/report-page/report-page').then(m => m.ReportPage)
    },
    // Ruta comodín para páginas no encontradas
    { 
        path: '**',
        redirectTo: 'home'
    }
];
