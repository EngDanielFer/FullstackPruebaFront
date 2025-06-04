import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface Auto {
  id: number;
  marca: string;
  sucursal: string;
  aspirante: string;
}

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit {
  API_URL = 'http://127.0.0.1:5000/autos';
  autos: Auto[] = [];
  formHabilitado: boolean = false;
  editingId: number | null = null;
  selectedRowId: number | null = null;
  eliminandoId: number | null = null;


  formData = {
    marca: '',
    sucursal: '',
    aspirante: ''
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchAutos();
  }

  fetchAutos() {
    this.http.get<Auto[]>(this.API_URL).subscribe(autos => this.autos = autos);
  }

  habilitarFormulario() {
    this.formHabilitado = true;
    this.editingId = null;
    this.selectedRowId = null;
    this.formData = {
      marca: '',
      sucursal: '',
      aspirante: ''
    };
  }

  cancelarFormulario() {
    this.formHabilitado = false;
    this.editingId = null;
    this.formData = { marca: '', sucursal: '', aspirante: '' };
  }

  cancelarEdicion() {
    this.selectedRowId = null;
    this.formHabilitado = false;
    this.formData = {
      marca: '',
      sucursal: '',
      aspirante: ''
    };
  }

  confirmarEdicion() {
    this.selectedRowId = null;
  }

  editarAuto(auto: any) {
    this.selectedRowId = auto.id;
    this.formData = { ...auto };
    this.editingId = auto.id;
    this.formHabilitado = true;
  }

  esFilaSeleccionada(auto: any): boolean {
    return this.selectedRowId === auto.id;
  }

  noEsFilaSeleccionada(auto: any): boolean {
    return this.selectedRowId != auto.id;
  }

  eliminarAuto(id: number) {
    if (id == null) {
      alert('ID inválido para eliminar');
      return;
    }

    this.eliminandoId = id;

    setTimeout(() => {
      this.http.delete(`${this.API_URL}/${id}`).subscribe(() => this.fetchAutos());
    }, 300);
  }

  guardarAuto() {
    if (this.editingId != null) {
      this.http.put(`${this.API_URL}/${this.editingId}`, this.formData)
        .subscribe(() => {
          this.fetchAutos();
          this.cancelarFormulario();
        });
    } else {
      this.http.post(this.API_URL, this.formData)
        .subscribe(() => {
          this.fetchAutos();
          this.cancelarFormulario();
        });
    }
  }
}
