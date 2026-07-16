import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar-left',
  templateUrl: './app-navbar-left.component.html',
  styleUrls: ['./app-navbar-left.component.css'],
  imports: [RouterLink]
})
export class AppNavbarLeftComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
