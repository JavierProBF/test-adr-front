import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { IntervencionModal } from '../../components/modals/intervencion-modal/intervencion-modal';

@Component({
  selector: 'app-list-task-page',
  standalone: true,
  imports: [RouterLink, IntervencionModal],
  templateUrl: './list-task-page.html',
  styleUrl: './list-task-page.css',
})
export class ListTaskPage {

}
