import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

export interface datosFactura2 {
  id: number;
  producto: string;
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
  // Añadimos las subfacturas directamente aquí
  detallesOpcionales?: {
    factura2: datosFactura2 | null;
    factura3: datosFactura2 | null;
    factura4: datosFactura2 | null;
    factura5: datosFactura2 | null;
    factura6: datosFactura2 | null;
    factura7: datosFactura2 | null;
    factura8: datosFactura2 | null;
    factura9: datosFactura2 | null;
  };
}

interface RespuestaConteo {
  total: number;
}

@Component({
  selector: 'app-calendario-dias-facturas',
  templateUrl: './calendario-dias-facturas.component.html',
  styleUrls: ['./calendario-dias-facturas.component.css'],
  standalone: true,
  imports: [RouterLink]
})
export class CalendarioDiasFacturasComponent implements OnInit {

  anioRecibido!: number;
  mesRecibido!: number;
  diaRecibido!: number;

  public factura: datosFactura[] = [];
  public totalFacturas: number = 0;

  private api = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const hoy = new Date();
    this.diaRecibido = hoy.getDate();
    this.mesRecibido = hoy.getMonth() + 1;
    this.anioRecibido = hoy.getFullYear();

    // Ejecutamos las llamadas iniciales de manera segura
    this.obtenerFactura();
    this.obtenerTotalFacturas();
  }

  obtenerFactura() {
    const urlAPI = `${this.api}/facturas-fecha/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<datosFactura[]>(urlAPI).subscribe({
      next: (respuesta) => {
        this.factura = respuesta;
        console.log("Facturas cargadas con éxito:", this.factura);
      },
      error: (error) => {
        console.error("Error al traer las facturas del día:", error);
        this.factura = []; // Evitamos valores nulos en el template
      }
    });
  }

  obtenerTotalFacturas() {
    const urlAPI = `${this.api}/facturas-count-fechas/${this.diaRecibido}/${this.mesRecibido}/${this.anioRecibido}`;

    this.http.get<RespuestaConteo>(urlAPI).subscribe({
      next: (respuesta) => {
        this.totalFacturas = respuesta.total;
        console.log("El total de facturas es:", this.totalFacturas);
      },
      error: (error) => {
        console.error("Error al obtener el conteo de facturas:", error);
      }
    });
  }

  // Genera un arreglo basado en la cantidad real de facturas recuperadas de la API
  get totalFacturasArray(): number[] {
    return Array.from({ length: this.totalFacturas }, (_, i) => i + 1);
  }
}