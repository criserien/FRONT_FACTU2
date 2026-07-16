import { Routes } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { CalendarioComponent } from './components/facturas/calendario/calendario.component';
import { CalendarioDiasComponent } from './components/facturas/calendario-dias/calendario-dias.component';
import { CalendarioDiasFacturasComponent } from './components/facturas/calendario-dias-facturas/calendario-dias-facturas.component';
import { FormatoFacturaComponent } from './components/facturas/formato-factura/formato-factura.component';

export const routes: Routes = [
    {
        path : '',
        component : InicioComponent
    },
    {
        path : 'facturas',
        component: FacturasComponent
    },
    {
        path : 'calendario',
        component : CalendarioComponent
    },
    {
        path : 'calendario-dias',
        component : CalendarioDiasComponent
    },
    {
        path : 'calendario-dias-facturas',
        component : CalendarioDiasFacturasComponent
    },
    {
        path : 'formato-factura',
        component : FormatoFacturaComponent
    },
    {
        //redirecciona cualquier ruta que no exista a la ruta raiz
        path : '**',
        redirectTo: ''
    }
];
