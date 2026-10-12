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
  numeroFactura: number = 1;
  diaRecibido: number = new Date().getDate();
  mesRecibido: number = new Date().getMonth() + 1;
  anioRecibido: number = new Date().getFullYear();
  cliente: string = '';
  direcTel: string = '';
  id: number | null = null;

  // Bandera: ¿venimos de una navegación con número fijo?
  private vieneDeNavegacion: boolean = false;

  // Arreglo fijo de 9 filas para la estructura del formato
  filas: FilaItem[] = Array.from({ length: 9 }, () => ({
    cantidad: 0,
    producto: '',
    total: 0,
    total_mayor: 0
  }));

  // URL del backend
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
      this.cliente = state['client'] || '';
      this.direcTel = state['direcTel'] || '';
      this.id = state['id'] || null;

      // Si viene número explícito desde la navegación, lo respetamos y NO consultamos al backend
      if (state['numFac']) {
        this.numeroFactura = Number(state['numFac']);
        this.vieneDeNavegacion = true;
      }

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
    // Solo consultamos al backend si NO vinimos con un número fijo por navegación
    if (!this.vieneDeNavegacion) {
      this.obtenerUltimoNumero();
    }

    if (this.id) {
      this.cargarDetallesOpcionales();
    }
  }

  // Consulta el último número de factura al backend y calcula el siguiente
  private obtenerUltimoNumero(): void {
    this.http.get<{ ultimo: number; numero?: number; ultimoNumero?: number }>(
      `${this.api}/api/ultima-factura`
    ).subscribe({
      next: (res) => {
        // Aceptamos cualquiera de los 3 alias por compatibilidad
        const ultimo = Number(res?.ultimo ?? res?.numero ?? res?.ultimoNumero ?? 0);
        this.numeroFactura = (isNaN(ultimo) ? 0 : ultimo) + 1;
      },
      error: (err) => {
        console.warn('No se pudo obtener el último número del backend, se usa 1 por defecto.', err);
        this.numeroFactura = 1;
      }
    });
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

    // Mapeo dinámico para las filas 2 a 9
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

        // Incrementa localmente y también sincroniza con el backend
        this.numeroFactura = Number(this.numeroFactura) + 1;
        this.obtenerUltimoNumero();
      },
      error: (err) => {
        console.error('Error al guardar la factura:', err);
        alert('Ocurrió un error al intentar guardar la factura.');
      }
    });
  }
}
