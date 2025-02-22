import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Animal, Atencion, Insumo, PrecioAtencion, Veterinario } from '../../../types.js';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { VeterinarioService } from '../../services/veterinario.service.js';
import { PrecioAtencionService } from '../../services/precio-atencion.service.js';
import { InsumoService } from '../../services/insumo.service.js';
import { AnimalService } from '../../services/animal.service.js';
import { catchError, map, Observable, of, Subject } from 'rxjs';
import { PrecioInsumoService } from '../../services/precio-insumo.service.js';

@Component({
  selector: 'app-registrar-atencion',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrar-atencion.component.html',
  styleUrl: './registrar-atencion.component.scss'
})
export class RegistrarAtencionComponent {

  atencionForm: FormGroup
  insumoSelections: FormArray
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
  insumos: Insumo[] = []
  selectedInsumos: { idInsumo: number, cantidad: number}[] = []

  constructor( private formBuilder: FormBuilder
    , private veterinarioService: VeterinarioService
    , private precioAtencionService: PrecioAtencionService
    , private insumoService: InsumoService
    , private animalService: AnimalService
    , private precioInsumoService: PrecioInsumoService
  ) {
    this.insumoSelections = this.formBuilder.array([]) 

    this.atencionForm = this.formBuilder.group({
      idAnimal: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')], [this.animalValidator()]], // <-- funcion async
      idVeterinario: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      resultado: ['', [Validators.required]],
      observaciones: ['', [Validators.required]],
      idsInsumos: this.insumoSelections,
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
    valor: 0,
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

  onConfirm(): void {
    const { resultado, observaciones, idAnimal, idVeterinario } = this.atencionForm.value;

    this.precioAtencionService.findMostRecent().subscribe((precioAtencion) => {
      let totalValor = precioAtencion.valor;

      const insumoRequests: Observable<number>[] = this.insumoSelections.value.map(
        (insumo: { idInsumo: number; cantidad: number }) =>
          this.precioInsumoService.findMostRecentByInsumo(insumo.idInsumo).pipe(
            map((precioInsumo) => precioInsumo.valorVenta * insumo.cantidad)
          )
      );

      Promise.all(insumoRequests.map((req: Observable<number>) => req.toPromise()))
        .then((preciosInsumo: (number | undefined)[]) => {
          const validPrecios = preciosInsumo.filter((p): p is number => p !== undefined);
          totalValor += validPrecios.reduce((acc, curr) => acc + curr, 0);

          const stockUpdates = this.insumoSelections.value.map(
            (insumo: { idInsumo: number; cantidad: number }) =>
              this.insumoService.decreaseStock(insumo.idInsumo, insumo.cantidad).toPromise()
          );

          return Promise.all(stockUpdates).then(() => totalValor);
        })
        .then((valor) => {
          this.confirm.emit({
            fechaHora: new Date().toISOString(),
            resultado: resultado || '',
            observaciones: observaciones || '',
            valor: valor,
            idAnimal: Number(idAnimal) || 0,
            idPrecio: Number(precioAtencion.idPrecioAtencion) || 0,
            idVeterinario: Number(idVeterinario) || 0,
            idsInsumos: this.insumoSelections.value.map((i: { idInsumo: number }) => i.idInsumo),
          });

          this.display = false;
          this.displayChange.emit(this.display);

          this.insumoService.findAll().subscribe((data: Insumo[]) => {
            this.insumos = data.filter((insumo) => insumo.stock > 0);
          });
        })
        .catch((error) => {
          console.error('Error al actualizar stock o calcular precios', error);
          alert('No se pudo completar la operación.');
        });
    });
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

    this.precioAtencionService.findMostRecent().subscribe((data: PrecioAtencion) => {
      this.precio = data
    })

    this.insumoService.findAll().subscribe((data: Insumo[]) => {
      this.insumos = data.filter((insumo) => insumo.stock > 0)
    })

    this.addInsumoSelection() 
    
  }

  //-----------------------------------------------------------------------------------

  addInsumoSelection(): void {
    this.insumoSelections.push(
      this.formBuilder.group({
        idInsumo: [null, Validators.required],
        cantidad: ['', [Validators.required, Validators.min(1)]],
      })
    );
  }

  removeInsumoSelection(index: number): void {
    if (this.insumoSelections.length > 1) {
      this.insumoSelections.removeAt(index);
    }
  }

  onInsumoChange(index: number, event: Event) {

    const target = event.target as HTMLSelectElement
    const idInsumo = Number(target?.value)

    const control = this.insumoSelections.at(index) as FormGroup
    control.patchValue({ idInsumo })
  }

  onCantidadChange(index: number, cantidad: number) {
    const control = this.insumoSelections.at(index) as FormGroup
    control.patchValue({ cantidad })
  }

  getAvailableInsumos(index: number): Insumo[] {
    const selectedIds = this.insumoSelectionsControls
      .map((control, i) => (i !== index ? control.get('idInsumo')?.value : null))
      .filter((id) => id !== null);

    return this.insumos.filter((insumo) => !selectedIds.includes(insumo.codInsumo));
  }

  getStockLimit(idInsumo: number | null ): number {

    if (!idInsumo) return 1

    const insumo = this.insumos.find((item) => item.codInsumo === idInsumo);
    return insumo ? insumo.stock : 1;
  }

  validateQuantity(index: number): boolean | null {

    const control = this.insumoSelections.at(index) as FormGroup

    const idInsumo = control.get('idInsumo')?.value
    const cantidad = control.get('cantidad')?.value

    const insumo = this.insumos.find((item) => item.codInsumo === idInsumo);

    if (insumo && cantidad > insumo.stock) {
      return true
    }
    return null;

  }

  canAddNewSelection(): boolean {
    return this.insumoSelectionsControls.every((control: FormGroup) => {
      const idInsumo = control.get('idInsumo')?.value;
      const cantidad = control.get('cantidad')?.value;
      return idInsumo && cantidad && cantidad > 0;
    });
  }

  get insumoSelectionsControls(): FormGroup[] {
    return this.insumoSelections.controls as FormGroup[];
  }

}
