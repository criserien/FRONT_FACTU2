import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

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

  // Lista con los nombres de los meses en orden (índices 0 a 11)
  meses: string[] = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  constructor(private router: Router) {
    // Recuperamos el estado de la navegación
    const navegacion = this.router.getCurrentNavigation();
    
    if (navegacion?.extras.state) {
      this.anioRecibido = navegacion.extras.state['anio'];
      this.mesRecibido = navegacion.extras.state['mes'];
    }
  }

  // Método helper para obtener el nombre del mes según mesRecibido (1-12)
  obtenerNombreMes(): string {
    const indice = Number(this.mesRecibido) - 1;
    return this.meses[indice] || '';
  }

  navegarADetalle(evento: Event) {
    // 1. Capturamos el elemento HTML exacto al que se le hizo clic
    const elemento = evento.target as HTMLElement;

    // 2. Leemos su texto ("11") y lo transformamos a tipo number
    this.numeroGuardado = Number(elemento.innerText);

    this.router.navigate(['/calendario-dias-facturas2'], {
      state: { 
        mes: this.mesRecibido, 
        anio: this.anioRecibido,
        dia : this.numeroGuardado
      }
    });
  }
}
