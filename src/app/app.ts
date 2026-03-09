import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenu } from "./components/side-menu/side-menu";
import { Chat } from './components/chat/chat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenu, Chat],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('front');
}
