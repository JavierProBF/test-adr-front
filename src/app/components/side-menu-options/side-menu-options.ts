import { Component } from '@angular/core';
import { SideMenu } from '../side-menu/side-menu';
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
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.css',
})
export class SideMenuOptions {
SideMenuItems: MenuItem[] = [
    { label: 'Home', route: '/home', icon: 'fa-solid fa-house-chimney-user fa-lg' },
    { label: 'ADR', route: '/consult', icon: 'fa-solid fa-magnifying-glass' },
    { label: 'Register', route: '/home/register', icon: 'fa-solid fa-file-pen' }
  ];
}
