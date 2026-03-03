import { Component } from '@angular/core';
import { SideMenu } from '../side-menu/side-menu';


interface MenuItem {
    label: string;
    route: string;
    icon: string;
}   

@Component({
  selector: 'app-side-menu-options',
  imports: [],
  templateUrl: './side-menu-options.html',
  styleUrl: './side-menu-options.css',
})
export class SideMenuOptions {
SideMenuItems: MenuItem[] = [
    { label: 'Home', route: '/home', icon: 'home' },
    { label: 'Consult', route: '/consult', icon: 'search' },
    { label: 'Register', route: '/register', icon: 'edit' }
  ];
}
