import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { AppNavbarLeftComponent } from './components/app-navbar-left/app-navbar-left.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppNavbarComponent, AppNavbarLeftComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('facturacion');
}
