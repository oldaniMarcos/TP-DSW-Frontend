import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PrecioAtencion } from '../../../../types';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-precio-atencion-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './precio-atencion-popup.component.html',
  styleUrl: './precio-atencion-popup.component.scss'
})
export class PrecioAtencionPopupComponent {
  
  precioAtencionForm: FormGroup

    constructor( private formBuilder: FormBuilder) {
      this.precioAtencionForm = this.formBuilder.group({
        fechaDesde: [this.getTodayDate(), [Validators.required]],
        valor: ['', [Validators.required]],
      })
    }
  
    title = 'Actualizar precio atención'
    @Input() display: boolean = false
  
    @Output() displayChange = new EventEmitter<boolean>()
    @Output() confirm = new EventEmitter<PrecioAtencion>()
  
    @Input() precioAtencion: PrecioAtencion = {
      fechaDesde: this.getTodayDate(),
      valor: 0,
    }
  
    onConfirm() {
      const { fechaDesde, valor } = this.precioAtencionForm.value
  
      this.confirm.emit({
        fechaDesde: fechaDesde || this.getTodayDate(),
        valor: Number(valor) || 0
      })
  
      this.display = false
      this.displayChange.emit(this.display)
    }
  
    onCancel() {
      this.display = false
      this.displayChange.emit(this.display)
    }
  
    ngOnChanges() {
      this.precioAtencionForm.patchValue(this.precioAtencion)
    }

    private getTodayDate(): string {
      return new Date().toISOString().split('T')[0];
    }
  
  }