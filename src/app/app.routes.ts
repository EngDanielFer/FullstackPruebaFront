import { Routes } from '@angular/router';
import { PortadaComponent } from "./components/portada/portada.component";
import { FormularioComponent } from "./components/formulario/formulario.component";

export const routes: Routes = [
    { path: '', component: PortadaComponent },
    { path: 'formulario', component: FormularioComponent }
];
