import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Animal, Atencion, PrecioAtencion, Veterinario } from '../../../types.js';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { VeterinarioService } from '../../services/veterinario.service.js';

@Component({
  selector: 'app-registrar-atencion',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-atencion.component.html',
  styleUrl: './registrar-atencion.component.scss'
})
export class RegistrarAtencionComponent {

  //la fecha y hora se registra automaticamente
  // falta todavia

  atencionForm: FormGroup
  animal: Animal = {
    nombre: '',
    fechaNac: '',
    edad: 0,
    idCliente: 0,
    idRaza: 0,
  }
  precio: PrecioAtencion = {
    fechaDesde: '',
    valor: 0,
  }
  veterinarios: Veterinario[] = []

  constructor( private formBuilder: FormBuilder
    , private veterinarioService: VeterinarioService
  ) {
    this.atencionForm = this.formBuilder.group({
      idAnimal: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      idVeterinario: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      resultado: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string 

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Atencion>()

  @Input() atencion: Atencion = {
    fechaHora: '',
    resultado: '',
    observaciones: '',
    idAnimal: 0,
    idPrecio: 0,
    idVeterinario: 0,
    idsInsumos: []
  }

  onConfirm() {
    const { fechaHora, resultado, observaciones, idAnimal, idPrecio, idVeterinario} = this.atencionForm.value

    this.confirm.emit({
      fechaHora: new Date().toISOString() || '',
      resultado: resultado || '',
      observaciones: observaciones || '',
      idAnimal: 8, //Number(idAnimal) || 0,
      idPrecio: 1, //Number(idPrecio) || 0,
      idVeterinario: Number(idVeterinario) || 0,
      idsInsumos: []  //por ahora vacio
    })

    this.display = false
    this.displayChange.emit(this.display)
  }
  
  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.atencionForm.patchValue(this.atencion)
  }

  ngOnInit(): void {
    this.veterinarioService.findAll().subscribe((data: Veterinario[]) => {
      this.veterinarios = data;
    });
  }


}
