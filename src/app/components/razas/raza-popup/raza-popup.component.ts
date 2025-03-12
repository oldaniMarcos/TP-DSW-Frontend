import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { Especie, Raza } from '../../../../types';
import { EspecieService } from '../../../services/especie.service';

@Component({
  selector: 'app-raza-popup',
  standalone: true,
  imports: [CommonModule, DialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './raza-popup.component.html'
})
export class RazaPopupComponent {

  breedForm: FormGroup

  constructor( private formBuilder: FormBuilder, private especieService: EspecieService) {
    this.breedForm = this.formBuilder.group({
      descripcion: ['', [Validators.required]],
      idEspecie: [0, [Validators.required, Validators.pattern('^[1-9][0-9]*$')]]
    })
  }

  species: Especie[] = []

  @Input() display: boolean = false
  @Input() title!: string 

  @Output() displayChange = new EventEmitter<boolean>()
  @Output() confirm = new EventEmitter<Raza>()

  @Input() raza: Raza = {
    descripcion: '',
    idEspecie: 0
  }

  onConfirm() {
    const { descripcion, idEspecie } = this.breedForm.value

    this.confirm.emit({
      descripcion: descripcion || '',
      idEspecie: Number(idEspecie) || 0
    })

    this.display = false
    this.displayChange.emit(this.display)
  }

  onCancel() {
    this.display = false
    this.displayChange.emit(this.display)
  }

  ngOnChanges() {
    this.breedForm.patchValue(this.raza)
  }

  ngOnInit(): void {
    this.especieService.findAll().subscribe((data: Especie[]) => {
      this.species = data;
    });
  }

}
