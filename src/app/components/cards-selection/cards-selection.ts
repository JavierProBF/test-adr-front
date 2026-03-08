import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Carousel } from '../carousel/carousel';
import { TitleHome } from '../title-home/title-home';

@Component({
  selector: 'app-cards-selection',
  imports: [RouterModule, Carousel, TitleHome],
  templateUrl: './cards-selection.html',
  styleUrl: './cards-selection.css',
})
export class CardsSelection {

}
