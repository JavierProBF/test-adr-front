import { Component, input } from '@angular/core';

@Component({
  selector: 'app-side-menu-bar',
  imports: [],
  host: {
    '[class.is-collapsed]': 'collapsed()',
  },
  templateUrl: './side-menu-bar.html',
  styleUrl: './side-menu-bar.css',
})
export class SideMenuBar {
  collapsed = input<boolean>(false);
}
