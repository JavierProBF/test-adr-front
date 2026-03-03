import { Component } from '@angular/core';
import { SideMenuBar } from "../side-menu-bar/side-menu-bar";
import { SideMenuOptions } from "../side-menu-options/side-menu-options";



@Component({
  selector: 'app-side-menu',
  imports: [SideMenuBar, SideMenuOptions],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',
})
export class SideMenu {

}
