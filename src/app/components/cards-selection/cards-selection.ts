import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Carousel } from '../carousel/carousel';

@Component({
  selector: 'app-cards-selection',
  imports: [RouterModule, Carousel],
  templateUrl: './cards-selection.html',
  styleUrl: './cards-selection.css',
})
export class CardsSelection {

}
