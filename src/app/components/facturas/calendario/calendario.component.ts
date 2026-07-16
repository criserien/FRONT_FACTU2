import { Component, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css'],
  imports: [RouterLink]
})
export class CalendarioComponent implements OnInit {
  anioRecibido: any;

  constructor(private router: Router) {
    // Recuperamos el estado de la navegación
    const navegacion = this.router.getCurrentNavigation();
    
    if (navegacion?.extras.state) {
      this.anioRecibido = navegacion.extras.state['anio'];
    }
  }

  ngOnInit() {
  }

}
