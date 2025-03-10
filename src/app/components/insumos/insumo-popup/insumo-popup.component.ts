import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Insumo, TipoInsumo } from '../../../../types';
import { InsumoService } from '../../../services/insumo.service';
import { PrecioInsumoService } from '../../../services/precio-insumo.service';

@Component({
  selector: 'app-insumo-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './insumo-popup.component.html'
})
export class InsumoPopupComponent {

  insumoForm: FormGroup

  constructor( private formBuilder: FormBuilder, private insumoService: InsumoService, private precioInsumoService: PrecioInsumoService) {
    this.insumoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      fechaVencimiento: ['', [Validators.required]],
      idTipoInsumo: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],

      valor: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      valorVenta: ['' , [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    })
  }

  insumoTypes: TipoInsumo[] = [];

  @Input() display: boolean = false
  @Input() title!: string
  @Input() isCreating: boolean = true

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<{ insumo: Insumo; valor: number; valorVenta: number }>();


  @Input() insumo: Insumo = {
    descripcion: '',
    stock: 0,
    fechaVencimiento: '',
    idTipoInsumo: 0,
  }

  onConfirm() {
    const { descripcion, stock, fechaVencimiento, idTipoInsumo, valor, valorVenta} = this.insumoForm.value

    const insumo: Insumo = {
      descripcion: descripcion || '',
      stock: Number(stock) || 0,
      fechaVencimiento: fechaVencimiento || '',
      idTipoInsumo: Number(idTipoInsumo) || 0,
    };

    this.confirm.emit({

      insumo,
      valor: Number(valor) || 0,
      valorVenta: Number(valorVenta) || 0,
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    if (this.insumo && !this.isCreating) {
      this.insumoForm.patchValue({
        ...this.insumo,
        valor: 1, 
        valorVenta: 1, 
      });
    } else if (this.isCreating) {
      this.insumoForm.patchValue({
        valor: '',
        valorVenta: ''
      });
    }
  }

  ngOnInit(): void {
    this.insumoService.findAllTipos().subscribe((data: TipoInsumo[]) => {
      this.insumoTypes = data;
    });
  }
}
