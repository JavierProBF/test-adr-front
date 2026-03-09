import { Component } from '@angular/core';
import { SideMenu } from "../../components/side-menu/side-menu";
import { CardsSelection } from "../../components/cards-selection/cards-selection";
import { Chat } from "../../components/chat/chat";




@Component({
  selector: 'app-home-page',
  imports: [SideMenu, CardsSelection, Chat],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css',
})
export class HomePage {

}
