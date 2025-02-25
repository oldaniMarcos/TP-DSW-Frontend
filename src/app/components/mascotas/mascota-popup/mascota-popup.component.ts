import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Animal, Especie, Raza } from '../../../../types';
import { EspecieService } from '../../../services/especie.service';

@Component({
  selector: 'app-mascota-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mascota-popup.component.html',
  styleUrl: './mascota-popup.component.scss'
})
export class MascotaPopupComponent {

  mascotaForm: FormGroup

  constructor( private formBuilder: FormBuilder, private especieService: EspecieService) {
    this.mascotaForm = this.formBuilder.group({
      nroHistClinica: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      fechaNac: ['', [Validators.required]],
      idCliente: ['', [Validators.required]],
      idRaza: ['', [Validators.required]],
      idEspecie: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string //! -> siempre se provee

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Animal>()

  @Input() mascota: Animal = {
    nroHistClinica: 0,
    nombre: '',
    fechaNac: '',
    idCliente: 0, 
    idRaza: 0,
  }

  especies: Especie[] = [];
  razas: Raza[] = [];
  idEspecie: number = 0;
  idRaza: number = 0;

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
      const especieId = this.mascotaForm.get('idEspecie')?.value;
      if (especieId) {
        this.loadRazasByEspecieId(especieId);
      } else {
        this.razas = [];
      }
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

  onConfirm() {
    const { nombre, fechaNac, idRaza} = this.mascotaForm.value
    const idCliente = localStorage.getItem('id');

    this.confirm.emit({
      nombre: nombre || '',
      fechaNac: fechaNac || '',
      idCliente: Number(idCliente),
      idRaza: Number(idRaza),
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.mascotaForm.patchValue(this.mascota);
  }
}
