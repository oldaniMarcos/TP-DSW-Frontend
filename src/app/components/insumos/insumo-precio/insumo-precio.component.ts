import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Insumo, PrecioInsumo } from '../../../../types';
import { PrecioInsumoService } from '../../../services/precio-insumo.service';

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
      valor: ['', [Validators.required]],
      valorVenta: ['', [Validators.required]],
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
      fechaDesde: new Date().toISOString(),
      valor: Number(this.precioForm.value.valor),
      valorVenta: Number(this.precioForm.value.valorVenta),
      idInsumo: this.insumo.codInsumo,
    };

    this.precioInsumoService.post(precio).subscribe(
      () => {
        this.display = false;
        this.displayChange.emit(this.display);
      },
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
