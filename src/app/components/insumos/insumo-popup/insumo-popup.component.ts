import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Insumo, TipoInsumo } from '../../../../types';
import { InsumoService } from '../../../services/insumo.service';

@Component({
  selector: 'app-insumo-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './insumo-popup.component.html',
  styleUrl: './insumo-popup.component.scss'
})
export class InsumoPopupComponent {

  insumoForm: FormGroup

  constructor( private formBuilder: FormBuilder, private insumoService: InsumoService) {
    this.insumoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
      tipoInsumoCodTipoInsumo: ['', [Validators.required]],
    })
  }

  tiposInsumo: TipoInsumo[] = [];

  @Input() display: boolean = false
  @Input() title!: string //! -> siempre se provee

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Insumo>()

  @Input() insumo: Insumo = {
    descripcion: '',
    stock: 0,
    fechaVencimiento: '',
    tipoInsumoCodTipoInsumo: 0,
  }

  onConfirm() {
    const { descripcion, stock, fechaVencimiento, tipoInsumoCodTipoInsumo} = this.insumoForm.value

    this.confirm.emit({
      descripcion: descripcion || '',
      stock: stock || 0,
      fechaVencimiento: fechaVencimiento || '',
      tipoInsumoCodTipoInsumo: tipoInsumoCodTipoInsumo || 0,
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.insumoForm.patchValue(this.insumo)
  }

  ngOnInit(): void {
    this.insumoService.findAllTipos().subscribe((data: TipoInsumo[]) => {
      this.tiposInsumo = data;
    });
  }
}
