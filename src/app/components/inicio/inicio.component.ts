import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface RespuestaConteo {
  total: number;
}

interface RespuestaPremio {
  total_clientes: number;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public totalFacturas: number = 0;
  public premioCliente: number = 0;
  public nombres = ["aurit", "prof", "tax", "yeni", "arturo", "abian", "cuervo"];
  public premios = [0,0,0,0,0,0,0];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<RespuestaConteo>('https://back-factu-2.vercel.app/api/facturas-count2').subscribe((data) => {
      this.totalFacturas = data.total;
    });
  }

}
