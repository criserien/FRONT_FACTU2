import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'calendario-dias',
  templateUrl: './calendario-dias.component.html',
  styleUrls: ['./calendario-dias.component.css'],
})
export class CalendarioDiasComponent {

  @ViewChild('dia11') dia11!: ElementRef;

  anioRecibido: any;
  mesRecibido: any;
  numeroGuardado: number = 0;

  constructor(private router: Router) {
    // Recuperamos el estado de la navegación
    const navegacion = this.router.getCurrentNavigation();
    
    if (navegacion?.extras.state) {
      this.anioRecibido = navegacion.extras.state['anio'];
      this.mesRecibido = navegacion.extras.state['mes'];
    }
  }

  navegarADetalle(evento: Event) {
    
  // 1. Capturamos el elemento HTML exacto al que se le hizo clic
  const elemento = evento.target as HTMLElement;

  // 2. Leemos su texto ("11") y lo transformamos a tipo number
  this.numeroGuardado = Number(elemento.innerText);

  this.router.navigate(['/calendario-dias-facturas'], {
    state: { 
      mes: this.mesRecibido, 
      anio: this.anioRecibido,
      dia : this.numeroGuardado
    }
  });
}
}
