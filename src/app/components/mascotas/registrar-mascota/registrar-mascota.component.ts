import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Animal, Especie, Raza } from '../../../../types';
import { RazaService } from '../../../services/raza.service';
import { CommonModule } from '@angular/common';
import { EspecieService } from '../../../services/especie.service';

@Component({
  selector: 'app-registrar-mascota',
  standalone: true,
  templateUrl: './registrar-mascota.component.html',
  styleUrls: ['./registrar-mascota.component.scss'],
  imports: [FormsModule, CommonModule],
})
export class RegistrarMascotaComponent {
  @Output() registrarMascota = new EventEmitter<Animal>();
  @Output() cerrarModal = new EventEmitter<void>();

  // Propiedades del formulario
  nombre: string = '';
  fechaNac: string = '';
  edad: number = 0;
  idRaza: number = 0; // Agrega esta propiedad para la raza seleccionada
  idEspecie: number = 0; // Agrega esta propiedad para la especie seleccionada
  razas: Raza[] = []; // Array para almacenar las razas disponibles
  especies: Especie[] = []; // Array para almacenar las especies disponibles

  constructor(private especieService: EspecieService) {}

  ngOnInit(): void {
    this.loadEspecies(); // Carga las especies al inicializar el componente
  }

  loadEspecies(): void {
    this.especieService.findAll().subscribe(
      (data: Especie[]) => {
        this.especies = data; // Asigna las especies al array
      },
      (error) => {
        console.error('Error al cargar especies:', error);
      }
    );
  }

  onEspecieChange(): void {
    this.loadRazasByEspecieId(this.idEspecie); // Carga las razas cuando se selecciona una especie
  }

  loadRazasByEspecieId(especieId: number): void {
    this.especieService.findRazasByEspecieId(especieId).subscribe(
      (data: Raza[]) => {
        this.razas = data; // Asigna las razas al array
      },
      (error) => {
        console.error('Error al cargar razas:', error);
      }
    );
  }

  onSubmit() {
    const idCliente = localStorage.getItem('id'); // Obtén el ID del cliente del local storage

    const nuevaMascota: Animal = {
      nombre: this.nombre,
      fechaNac: this.fechaNac,
      edad: this.edad,
      idCliente: idCliente ? parseInt(idCliente, 10) : 0, // Convierte a número o asigna 0 si no existe
      idRaza: typeof this.idRaza === 'string' ? parseInt(this.idRaza, 10) : this.idRaza || 0,
  };

    console.log(nuevaMascota);

    // Emitir el evento con la nueva mascota
    this.registrarMascota.emit(nuevaMascota);
    this.cerrar(); // Cierra el modal
  }

  cerrar() {
    this.cerrarModal.emit();
  }
}