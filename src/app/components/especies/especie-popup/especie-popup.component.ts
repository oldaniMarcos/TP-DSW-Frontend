import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Especie } from '../../../../types';

@Component({
  selector: 'app-especie-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './especie-popup.component.html',
  styleUrl: './especie-popup.component.scss'
})
export class EspeciePopupComponent {

  especieForm: FormGroup

  constructor( private formBuilder: FormBuilder) {
    this.especieForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
    })
  }

  @Input() display: boolean = false
  @Input() title!: string //! -> siempre se provee

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Especie>()

  @Input() especie: Especie = {
    descripcion: '',
  }

  onConfirm() {
    const { descripcion } = this.especieForm.value

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
    this.especieForm.patchValue(this.especie)
  }
}
