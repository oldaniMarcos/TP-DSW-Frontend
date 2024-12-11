import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Animal, Atencion, PrecioAtencion, Veterinario } from '../../../types.js';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { VeterinarioService } from '../../services/veterinario.service.js';
import { PrecioAtencionService } from '../../services/precio-atencion.service.js';
import { InsumoService } from '../../services/insumo.service.js';
import { AnimalService } from '../../services/animal.service.js';
import { catchError, map, Observable, of, Subject } from 'rxjs';

@Component({
  selector: 'app-registrar-atencion',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-atencion.component.html',
  styleUrl: './registrar-atencion.component.scss'
})
export class RegistrarAtencionComponent {

  // falta todavia

  //private destroy$ = new Subject<void>()

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
    , private precioAtencionService: PrecioAtencionService
    , private insumoService: InsumoService
    , private animalService: AnimalService
  ) {
    this.atencionForm = this.formBuilder.group({
      idAnimal: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')], [this.animalValidator()]], // <-- funcion async
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

  animalValidator(): AsyncValidatorFn { //tiene que ser async porque el findOne es async
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const value = control.value;

      if (!value) {
        return of(null);
      }

      return this.animalService.findOne(Number(value)).pipe(
      map((data) => {
        return data ? null : { notFound: true };
      }),
      catchError((error) => {
        console.error('Error en animalValidator:', error);
        return of({ notFound: true });
      }))
      
    };
  }

  onConfirm() {
    const {resultado, observaciones, idAnimal, idVeterinario} = this.atencionForm.value

    this.confirm.emit({
      fechaHora: new Date().toISOString() || '',
      resultado: resultado || '',
      observaciones: observaciones || '',
      idAnimal: Number(idAnimal) || 0,
      idPrecio: Number(this.precio.idPrecioAtencion) || 0,
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
    //this.atencionForm.reset()
  }

  ngOnInit(): void {
    this.veterinarioService.findAll().subscribe((data: Veterinario[]) => {
      this.veterinarios = data;
    });

    this.precioAtencionService.findMostRecent().subscribe((data: PrecioAtencion) => {
      this.precio = data
    })   
    
  }

  // ngOnDestroy(): void {
  //   this.destroy$.next();
  //   this.destroy$.complete();
  // }

}
