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
    this.http.get<RespuestaConteo>('http://localhost:3000/api/facturas-count').subscribe((data) => {
      this.totalFacturas = data.total;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[0]}`).subscribe((data) => {
      this.premios[0] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[1]}`).subscribe((data) => {
      this.premios[1] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[2]}`).subscribe((data) => {
      this.premios[2] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[3]}`).subscribe((data) => {
      this.premios[3] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[4]}`).subscribe((data) => {
      this.premios[4] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[5]}`).subscribe((data) => {
      this.premios[5] = data.total_clientes;
    });
    this.http.get<RespuestaPremio>(`http://localhost:3000/api/facturas-premio/${this.nombres[6]}`).subscribe((data) => {
      this.premios[6] = data.total_clientes;
    });
  }

}
