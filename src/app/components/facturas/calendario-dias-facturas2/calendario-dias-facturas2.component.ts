import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

export interface datosFactura2 {
  id: number;
  producto: string;
  max_id?: number;
  cantidad: number;
  total: number;
  total_mayor: number;
}

export interface datosFactura {
  id: number;
  producto: string;
  cantidad: number; 
  total: number; 
  numero: number;
  dia: number;
  mes: number;
  anio: number;
  cliente: string; 
  direc_tel: string;
  total_mayor: number;
  terminado?: boolean;
  pago?: boolean;
  detallesOpcionales?: {
    factura2: datosFactura2 | null;
    factura3: datosFactura2 | null;
    factura4: datosFactura2 | null;
    factura5: datosFactura2 | null;
    factura6: datosFactura2 | null;
    factura7: datosFactura2 | null;
    factura8: datosFactura2 | null;
    factura9: datosFactura2 | null;
  } | null;
}

interface RespuestaConteo {
  total: number;
}

@Component({
  selector: 'app-calendario-dias-facturas2',
  templateUrl: './calendario-dias-facturas2.component.html',
  styleUrls: ['./calendario-dias-facturas2.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule]
})
export class CalendarioDiasFacturas2Component implements OnInit {

  anioRecibido!: number;
  mesRecibido!: number;
  diaRecibido!: number;

  public factura: datosFactura[] = [];
  public totalFacturas: number = 0;

  private api = 'https://back-factu-2.vercel.app/api';

  constructor(private http: HttpClient, private router: Router) {
    const navegacion = this.router.getCurrentNavigation();

    if (navegacion?.extras.state) {
      this.mesRecibido = navegacion.extras.state['mes'];
      this.anioRecibido = navegacion.extras.state['anio'];
      this.diaRecibido = navegacion.extras.state['dia'];
    }
  }

  ngOnInit(): void {
    this.cargarDatosDelDia();
  }

  cargarDatosDelDia() {
    this.obtenerFactura();
    this.obtenerTotalFacturas();
  }

  // GET: Obtiene las facturas de la BD2
  obtenerFactura() {
    const urlAPI = `${this.api}/facturas-fecha-db2/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<datosFactura[]>(urlAPI).subscribe({
      next: (respuesta) => {
        this.factura = respuesta.map(f => {
          const estadoLocal = localStorage.getItem(`factura_db2_${f.id}`);
          if (estadoLocal) {
            const parsed = JSON.parse(estadoLocal);
            f.terminado = parsed.terminado || false;
            f.pago = parsed.pago || false;
          } else {
            f.terminado = false;
            f.pago = false;
          }
          return f;
        });
        console.log("Facturas cargadas con éxito desde BD2:", this.factura);
      },
      error: (error) => {
        console.error("Error al traer las facturas del día desde BD2:", error);
        this.factura = []; 
      }
    });
  }

  // GET: Obtiene el conteo total de facturas de la BD2
  obtenerTotalFacturas() {
    const urlAPI = `${this.api}/facturas-count-fechas-db2/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<RespuestaConteo>(urlAPI).subscribe({
      next: (respuesta) => {
        this.totalFacturas = respuesta.total;
      },
      error: (error) => {
        console.error("Error al obtener el conteo de facturas en BD2:", error);
        this.totalFacturas = 0;
      }
    });
  }

  // Guardar estado local asociándolo a BD2
  guardarEstadoLocal(f: datosFactura) {
    const estado = {
      terminado: f.terminado,
      pago: f.pago
    };
    localStorage.setItem(`factura_db2_${f.id}`, JSON.stringify(estado));
  }

  // Método helper para sumar todos los total_mayor de una factura
  calcularPrecioFinal(f: datosFactura): number {
    let sumaTotal = Number(f.total_mayor) || 0;

    if (f.detallesOpcionales) {
      const subFacturas: (datosFactura2 | null)[] = [
        f.detallesOpcionales.factura2,
        f.detallesOpcionales.factura3,
        f.detallesOpcionales.factura4,
        f.detallesOpcionales.factura5,
        f.detallesOpcionales.factura6,
        f.detallesOpcionales.factura7,
        f.detallesOpcionales.factura8,
        f.detallesOpcionales.factura9
      ];

      for (const item of subFacturas) {
        if (item && item.total_mayor) {
          sumaTotal += Number(item.total_mayor);
        }
      }
    }

    return sumaTotal;
  }

  // 🆕 GETTER: Suma total general de TODAS las facturas del día
  get sumaTotalGeneral(): number {
    return this.factura.reduce((acumulado, f) => acumulado + this.calcularPrecioFinal(f), 0);
  }

  // PUT: Actualiza la información únicamente en BD2
  actualizarFactura(facturaAEditar: datosFactura) {
    const urlAPI = `${this.api}/facturas-db2/${facturaAEditar.id}`;

    const body = {
      ...facturaAEditar,
      producto2: facturaAEditar.detallesOpcionales?.factura2?.producto || null,
      cantidad2: facturaAEditar.detallesOpcionales?.factura2?.cantidad || 0,
      total2: facturaAEditar.detallesOpcionales?.factura2?.total || 0,
      total_mayor2: facturaAEditar.detallesOpcionales?.factura2?.total_mayor || 0,

      producto3: facturaAEditar.detallesOpcionales?.factura3?.producto || null,
      cantidad3: facturaAEditar.detallesOpcionales?.factura3?.cantidad || 0,
      total3: facturaAEditar.detallesOpcionales?.factura3?.total || 0,
      total_mayor3: facturaAEditar.detallesOpcionales?.factura3?.total_mayor || 0,

      producto4: facturaAEditar.detallesOpcionales?.factura4?.producto || null,
      cantidad4: facturaAEditar.detallesOpcionales?.factura4?.cantidad || 0,
      total4: facturaAEditar.detallesOpcionales?.factura4?.total || 0,
      total_mayor4: facturaAEditar.detallesOpcionales?.factura4?.total_mayor || 0,

      producto5: facturaAEditar.detallesOpcionales?.factura5?.producto || null,
      cantidad5: facturaAEditar.detallesOpcionales?.factura5?.cantidad || 0,
      total5: facturaAEditar.detallesOpcionales?.factura5?.total || 0,
      total_mayor5: facturaAEditar.detallesOpcionales?.factura5?.total_mayor || 0,

      producto6: facturaAEditar.detallesOpcionales?.factura6?.producto || null,
      cantidad6: facturaAEditar.detallesOpcionales?.factura6?.cantidad || 0,
      total6: facturaAEditar.detallesOpcionales?.factura6?.total || 0,
      total_mayor6: facturaAEditar.detallesOpcionales?.factura6?.total_mayor || 0,

      producto7: facturaAEditar.detallesOpcionales?.factura7?.producto || null,
      cantidad7: facturaAEditar.detallesOpcionales?.factura7?.cantidad || 0,
      total7: facturaAEditar.detallesOpcionales?.factura7?.total || 0,
      total_mayor7: facturaAEditar.detallesOpcionales?.factura7?.total_mayor || 0,

      producto8: facturaAEditar.detallesOpcionales?.factura8?.producto || null,
      cantidad8: facturaAEditar.detallesOpcionales?.factura8?.cantidad || 0,
      total8: facturaAEditar.detallesOpcionales?.factura8?.total || 0,
      total_mayor8: facturaAEditar.detallesOpcionales?.factura8?.total_mayor || 0,

      producto9: facturaAEditar.detallesOpcionales?.factura9?.producto || null,
      cantidad9: facturaAEditar.detallesOpcionales?.factura9?.cantidad || 0,
      total9: facturaAEditar.detallesOpcionales?.factura9?.total || 0,
      total_mayor9: facturaAEditar.detallesOpcionales?.factura9?.total_mayor || 0,
    };

    this.http.put(urlAPI, body).subscribe({
      next: (res: any) => {
        console.log('Sincronizado con BD2:', res.message);
        alert(`¡Factura N° ${facturaAEditar.numero} guardada con éxito en BD2!`);
        this.cargarDatosDelDia(); 
      },
      error: (err) => {
        console.error('Error al actualizar en BD2:', err);
        alert('No se pudo guardar la actualización en BD2.');
      }
    });
  }

  // DELETE: Elimina la factura únicamente de la BD2
  eliminarFactura(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta factura de BD2?');

    if (confirmar) {
      this.http.delete(`${this.api}/facturas-db2/${id}`).subscribe({
        next: () => {
          alert('Factura eliminada correctamente de BD2');

          localStorage.removeItem(`factura_db2_${id}`);
          this.factura = this.factura.filter(f => f.id !== id);

          if (this.totalFacturas > 0) {
            this.totalFacturas--;
          }
        },
        error: (err) => {
          console.error('Error al intentar eliminar la factura de BD2:', err);
          alert('No se pudo eliminar la factura de BD2. Inténtalo de nuevo.');
        }
      });
    }
  }

  get totalFacturasArray(): number[] {
    return Array.from({ length: this.totalFacturas }, (_, i) => i + 1);
  }
}