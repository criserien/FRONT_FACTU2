import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css'],
  imports: [RouterLink]
})
export class FacturasComponent implements OnInit {

  anio: number = 0;

  constructor() { }

  ngOnInit() {
  }

}
