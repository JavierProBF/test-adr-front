import { Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
  label: string;
  sublabel?: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  host: {
    '[class.is-collapsed]': 'collapsed()',
  },
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.css',
})
export class SideMenuOptions {
  collapsed = input<boolean>(false);

  SideMenuItems: MenuItem[] = [
    { label: 'Home', sublabel: 'Panel principal', route: '/home', icon: 'fa-solid fa-house-chimney-user fa-lg' },
    { label: 'ADR', sublabel: 'Consulta y trazabilidad', route: '/consult', icon: 'fa-solid fa-magnifying-glass' },
    { label: 'Register', sublabel: 'Nuevo registro ADR', route: '/register', icon: 'fa-solid fa-file-pen' },
    { label: 'Dashboard', sublabel: 'Resumen de Decisiones', route: '/report', icon: 'fa-solid fa-chart-bar' },
  ];
}
