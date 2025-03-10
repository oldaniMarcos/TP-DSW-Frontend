import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TipoInsumo } from '../../../../types';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-tipo-insumo-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DialogModule],
  templateUrl: './tipo-insumo-popup.component.html'
})
export class TipoInsumoPopupComponent {

  tipoInsumoForm: FormGroup

  constructor( private formBuilder: FormBuilder) {
    this.tipoInsumoForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string //! -> siempre se provee

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<TipoInsumo>()

  @Input() tipoInsumo: TipoInsumo = {
    descripcion: '',
  }

  onConfirm() {
    const { descripcion } = this.tipoInsumoForm.value

    this.confirm.emit({
      descripcion: descripcion || '',
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.tipoInsumoForm.patchValue(this.tipoInsumo)
  }
}
