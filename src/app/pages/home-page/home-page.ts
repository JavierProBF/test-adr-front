import { Component } from '@angular/core';
import { SideMenu } from "../../components/side-menu/side-menu";




@Component({
  selector: 'app-home-page',
  imports: [ SideMenu],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
