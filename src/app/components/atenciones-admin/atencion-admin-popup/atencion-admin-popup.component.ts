import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Atencion } from '../../../../types';

@Component({
  selector: 'app-atencion-admin-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './atencion-admin-popup.component.html',
  styleUrl: './atencion-admin-popup.component.scss'
})
export class AtencionAdminPopupComponent {

  atencionForm: FormGroup

  constructor( private formBuilder: FormBuilder) {
    this.atencionForm = this.formBuilder.group({
      fechaHora: ['', [Validators.required]],
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
  }

  onConfirm() {
    const { fechaHora, resultado, observaciones} = this.atencionForm.value

    this.confirm.emit({
      fechaHora: fechaHora || '',
      resultado: resultado || '',
      observaciones: observaciones || '',
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

}
