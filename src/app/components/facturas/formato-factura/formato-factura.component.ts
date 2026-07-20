import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface datosFactura {
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
}

interface datosFactura2 {
  id: number;
  producto: string;
  cantidad: number;
  total: number;
  total_mayor: number;
}

@Component({
  selector: 'app-formato-factura',
  templateUrl: './formato-factura.component.html',
  styleUrls: ['./formato-factura.component.css']
})
export class FormatoFacturaComponent implements OnInit {

  anioRecibido: any;
  mesRecibido: any;
  diaRecibido: any;
  numeroFactura: any;
  cliente: any;
  direcTel: any;
  cantidad: any;
  producto: any;
  total: any;
  total_mayor: any;
  id: any;

  public factura!: datosFactura;

  public factura2!: datosFactura2;
  public factura3!: datosFactura2;
  public factura4!: datosFactura2;
  public factura5!: datosFactura2;
  public factura6!: datosFactura2;
  public factura7!: datosFactura2;
  public factura8!: datosFactura2;
  public factura9!: datosFactura2;

  private api = 'https://prueba1-eight-rho.vercel.app/api';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

    const navegacion = this.router.getCurrentNavigation();

    if (navegacion?.extras.state) {

      this.anioRecibido = navegacion.extras.state['anio'];
      this.mesRecibido = navegacion.extras.state['mes'];
      this.diaRecibido = navegacion.extras.state['dia'];
      this.numeroFactura = navegacion.extras.state['numFac'];
      this.cliente = navegacion.extras.state['client'];
      this.direcTel = navegacion.extras.state['direcTel'];
      this.cantidad = navegacion.extras.state['cantidad'];
      this.producto = navegacion.extras.state['producto'];
      this.total = navegacion.extras.state['total'];
      this.total_mayor = navegacion.extras.state['total_mayor'];
      this.id = navegacion.extras.state['id'];
    }
  }

  ngOnInit(): void {

    console.log(this.factura2)

    if (this.id) {

      console.log(this.factura)
      this.obtenerFactura2();
      this.obtenerFactura3();
      this.obtenerFactura4();
      this.obtenerFactura5();
      this.obtenerFactura6();
      this.obtenerFactura7();
      this.obtenerFactura8();
      this.obtenerFactura9();
    }
  }

  obtenerFactura2() {

    this.http.get<datosFactura2>(`${this.api}/facturas2/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura2 = res;
        },

        error: (err) => {
          console.error('Error en factura 2', err);
        }
      });
  }

  obtenerFactura3() {

    this.http.get<datosFactura2>(`${this.api}/facturas3/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura3 = res;
        },

        error: (err) => {
          console.error('Error en factura 3', err);
        }
      });
  }

  obtenerFactura4() {

    this.http.get<datosFactura2>(`${this.api}/facturas4/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura4 = res;
        },

        error: (err) => {
          console.error('Error en factura 4', err);
        }
      });
  }

  obtenerFactura5() {

    this.http.get<datosFactura2>(`${this.api}/facturas5/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura5 = res;
        },

        error: (err) => {
          console.error('Error en factura 5', err);
        }
      });
  }

  obtenerFactura6() {

    this.http.get<datosFactura2>(`${this.api}/facturas6/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura6 = res;
        },

        error: (err) => {
          console.error('Error en factura 6', err);
        }
      });
  }

  obtenerFactura7() {

    this.http.get<datosFactura2>(`${this.api}/facturas7/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura7 = res;
        },

        error: (err) => {
          console.error('Error en factura 7', err);
        }
      });
  }

  obtenerFactura8() {

    this.http.get<datosFactura2>(`${this.api}/facturas8/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura8 = res;
        },

        error: (err) => {
          console.error('Error en factura 8', err);
        }
      });
  }

  obtenerFactura9() {

    this.http.get<datosFactura2>(`${this.api}/facturas9/${this.id}`)
      .subscribe({

        next: (res) => {
          this.factura9 = res;
        },

        error: (err) => {
          console.error('Error en factura 9', err);
        }
      });
  }

  calcularTotalGeneral(): number {

    let suma = Number(this.total_mayor) || 0;

    const facturas = [
      this.factura2,
      this.factura3,
      this.factura4,
      this.factura5,
      this.factura6,
      this.factura7,
      this.factura8,
      this.factura9
    ];

    facturas.forEach(f => {

      if (f) {
        suma += Number(f.total_mayor) || 0;
      }
    });

    return suma;
  }
}
