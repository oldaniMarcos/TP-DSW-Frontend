import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InsumoService } from '../../../services/insumo.service.js';
import { Insumo, PrecioInsumo } from '../../../../types.js';
import { PrecioInsumoService } from '../../../services/precio-insumo.service.js';

@Component({
  selector: 'app-insumo-precio',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './insumo-precio.component.html',
  styleUrl: './insumo-precio.component.scss'
})
export class InsumoPrecioComponent {

  precioForm: FormGroup

  constructor( private formBuilder: FormBuilder, private precioInsumoService: PrecioInsumoService) {
    this.precioForm = this.formBuilder.group({
      fechaDesde: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      valorVenta: ['', [Validators.required]],
      idInsumo: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string
  @Input() precioInsumo!: PrecioInsumo | null

  @Input() insumo: Insumo = {
    codInsumo: 0,
    descripcion: '',
    stock: 0,
    fechaVencimiento: '',
    idTipoInsumo: 0,
  }

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<PrecioInsumo>()

  onConfirm() {
    if (!this.insumo.codInsumo) return;

    const precio: PrecioInsumo = {
      fechaDesde: this.precioForm.value.fechaDesde || '',
      valor: Number(this.precioForm.value.valor),
      valorVenta: Number(this.precioForm.value.valorVenta),
      idInsumo: this.insumo.codInsumo,
    };

    this.precioInsumoService.post(precio).subscribe(
      () => {
        this.display = false;
        this.displayChange.emit(this.display);
      },
      (error) => {
        console.error('Error al crear el precio:', error);
      }
    );
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    if (this.precioInsumo) {
      this.precioForm.patchValue({
        fechaDesde: new Date().toISOString().split('T')[0], 
        valor: '',
        valorVenta: '',
        idInsumo: this.insumo.codInsumo,
      });
    } else {
      this.precioForm.patchValue({
        fechaDesde: new Date().toISOString().split('T')[0], 
        valor: '',
        valorVenta: '',
        idInsumo: this.insumo.codInsumo,
      });
    }
  }

  ngOnInit(): void {}

}
