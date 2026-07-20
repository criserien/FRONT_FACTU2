import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

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
  terminado?: boolean; // Mapeado para los checkboxes locales
  pago?: boolean;      // Mapeado para los checkboxes locales
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
  selector: 'app-calendario-dias-facturas',
  templateUrl: './calendario-dias-facturas.component.html',
  styleUrls: ['./calendario-dias-facturas.component.css'],
  standalone: true,
  imports: [RouterLink, FormsModule]
})
export class CalendarioDiasFacturasComponent implements OnInit {

  anioRecibido!: number;
  mesRecibido!: number;
  diaRecibido!: number;

  public factura: datosFactura[] = [];
  public totalFacturas: number = 0;

  private api = 'https://back-factu-2.vercel.app/api';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const hoy = new Date();
    this.diaRecibido = hoy.getDate();
    this.mesRecibido = hoy.getMonth() + 1;
    this.anioRecibido = hoy.getFullYear();

    this.cargarDatosDelDia();
  }

  cargarDatosDelDia() {
    this.obtenerFactura();
    this.obtenerTotalFacturas();
  }

  obtenerFactura() {
    const urlAPI = `${this.api}/facturas-fecha/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<datosFactura[]>(urlAPI).subscribe({
      next: (respuesta) => {
        // Al traer los datos mapeamos cada elemento para restaurar el estado desde LocalStorage
        this.factura = respuesta.map(f => {
          const estadoLocal = localStorage.getItem(`factura_${f.id}`);
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
        console.log("Facturas cargadas con éxito y estados locales aplicados:", this.factura);
      },
      error: (error) => {
        console.error("Error al traer las facturas del día:", error);
        this.factura = []; 
      }
    });
  }

  obtenerTotalFacturas() {
    const urlAPI = `${this.api}/facturas-count-fechas/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<RespuestaConteo>(urlAPI).subscribe({
      next: (respuesta) => {
        this.totalFacturas = respuesta.total;
      },
      error: (error) => {
        console.error("Error al obtener el conteo de facturas:", error);
        this.totalFacturas = 0;
      }
    });
  }

  // Sincroniza instantáneamente el estado del checkbox al cambiar
  guardarEstadoLocal(f: datosFactura) {
    const estado = {
      terminado: f.terminado,
      pago: f.pago
    };
    localStorage.setItem(`factura_${f.id}`, JSON.stringify(estado));
  }

  actualizarFactura(facturaAEditar: datosFactura) {
    const urlAPI = `${this.api}/facturas/${facturaAEditar.id}`;

    const body = {
      ...facturaAEditar,
      producto2: facturaAEditar.detallesOpcionales?.factura2?.producto || null,
      amount2: facturaAEditar.detallesOpcionales?.factura2?.cantidad || 0,
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
        console.log('Sincronizado con TiDB:', res.message);
        alert(`¡Factura N° ${facturaAEditar.numero} guardada con éxito en la base de datos!`);
        this.cargarDatosDelDia(); 
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('No se pudo guardar la actualización.');
      }
    });
  }

  // MÉTODO CORREGIDO
  eliminarFactura(id: number): void {
    const confirmar = confirm('¿Estás seguro de que deseas eliminar esta factura de forma permanente?');
    
    if (confirmar) {
      this.http.delete(`${this.api}/facturas/${id}`).subscribe({
        next: () => {
          alert('Factura de venta eliminada correctamente');
          
          // 1. Limpiamos el estado del LocalStorage para esta factura
          localStorage.removeItem(`factura_${id}`);
          
          // 2. CORREGIDO: Cambiado 'this.facturas' a 'this.factura' (en singular)
          this.factura = this.factura.filter(f => f.id !== id);
          
          // 3. Actualizamos el contador total restándole 1 de forma reactiva
          if (this.totalFacturas > 0) {
            this.totalFacturas--;
          }
        },
        error: (err) => {
          console.error('Error al intentar eliminar la factura:', err);
          alert('No se pudo eliminar la factura. Inténtalo de nuevo.');
        }
      });
    }
  }

  get totalFacturasArray(): number[] {
    return Array.from({ length: this.totalFacturas }, (_, i) => i + 1);
  }
}