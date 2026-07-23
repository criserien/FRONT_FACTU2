import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface FilaItem {
  cantidad: number;
  producto: string;
  total: number;       // Valor unitario
  total_mayor: number; // Valor total de la fila (cantidad * total)
}

@Component({
  selector: 'app-formato-factura',
  templateUrl: './formato-factura.component.html',
  styleUrls: ['./formato-factura.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class FormatoFacturaComponent implements OnInit {

  // Encabezado
  numeroFactura: number = 0;
  diaRecibido: number = new Date().getDate();
  mesRecibido: number = new Date().getMonth() + 1;
  anioRecibido: number = new Date().getFullYear();
  cliente: string = '';
  direcTel: string = '';
  id: number | null = null;

  // Arreglo fijo de 9 filas para la estructura del formato
  filas: FilaItem[] = Array.from({ length: 9 }, () => ({
    cantidad: 0,
    producto: '',
    total: 0,
    total_mayor: 0
  }));

  // URL del backend (Asegúrate de apuntar a la URL base de tu backend)
  private api = 'https://back-factu-2.vercel.app'; 

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const navegacion = this.router.getCurrentNavigation();

    if (navegacion?.extras.state) {
      const state = navegacion.extras.state;
      this.anioRecibido = state['anio'] || this.anioRecibido;
      this.mesRecibido = state['mes'] || this.mesRecibido;
      this.diaRecibido = state['dia'] || this.diaRecibido;
      this.numeroFactura = state['numFac'] || 0;
      this.cliente = state['client'] || '';
      this.direcTel = state['direcTel'] || '';
      this.id = state['id'] || null;

      // Fila 1 inicial si proviene de la navegación
      if (state['producto']) {
        this.filas[0] = {
          cantidad: Number(state['cantidad']) || 0,
          producto: state['producto'] || '',
          total: Number(state['total']) || 0,
          total_mayor: Number(state['total_mayor']) || 0
        };
      }
    }
  }

  ngOnInit(): void {
    if (this.id) {
      this.cargarDetallesOpcionales();
    }
  }

  // Carga opcional si viene de una factura guardada
  cargarDetallesOpcionales() {
    this.http.get<any>(`${this.api}/api/facturas-fecha-db2/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`)
      .subscribe({
        next: (facturas) => {
          const encontrada = facturas.find((f: any) => f.id === this.id);
          if (encontrada && encontrada.detallesOpcionales) {
            for (let i = 2; i <= 9; i++) {
              const sub = encontrada.detallesOpcionales[`factura${i}`];
              if (sub) {
                this.filas[i - 1] = {
                  cantidad: sub.cantidad || 0,
                  producto: sub.producto || '',
                  total: sub.total || 0,
                  total_mayor: sub.total_mayor || 0
                };
              }
            }
          }
        },
        error: (err) => console.error('Error al cargar la factura:', err)
      });
  }

  // Recalcula el total de la fila cuando cambian cantidad o valor unitario
  actualizarFila(index: number) {
    const fila = this.filas[index];
    const cant = Number(fila.cantidad) || 0;
    const unitario = Number(fila.total) || 0;
    fila.total_mayor = cant * unitario;
  }

  // Suma total de todas las filas
  calcularTotalGeneral(): number {
    return this.filas.reduce((acc, fila) => acc + (Number(fila.total_mayor) || 0), 0);
  }

  // Envía los datos con POST /factura
  guardarFactura() {
    const body: any = {
      // Fila 1 (Principal)
      producto: this.filas[0].producto,
      cantidad: this.filas[0].cantidad,
      total: this.filas[0].total,
      total_mayor: this.filas[0].total_mayor,
      
      // Datos Generales
      numero: this.numeroFactura,
      dia: this.diaRecibido,
      mes: this.mesRecibido,
      anio: this.anioRecibido,
      cliente: this.cliente,
      direc_tel: this.direcTel
    };

    // Mapeo dinámico para las filas 2 a 9 (producto2, cantidad2, total2, total_mayor2, etc.)
    for (let i = 2; i <= 9; i++) {
      const item = this.filas[i - 1];
      body[`producto${i}`] = item.producto || null;
      body[`cantidad${i}`] = item.cantidad || 0;
      body[`total${i}`] = item.total || 0;
      body[`total_mayor${i}`] = item.total_mayor || 0;
    }

    this.http.post(`${this.api}/factura`, body).subscribe({
      next: (res: any) => {
        alert('¡Factura guardada exitosamente en BD1 y BD2!');
        console.log('Respuesta del servidor:', res);
      },
      error: (err) => {
        console.error('Error al guardar la factura:', err);
        alert('Ocurrió un error al intentar guardar la factura.');
      }
    });
  }
}
