import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css'],
  imports: [RouterLink]
})
export class AppNavbarComponent {

  admin = "Yesid Sanchez";

}
