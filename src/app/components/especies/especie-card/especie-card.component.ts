import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Especie } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-especie-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule],
  templateUrl: './especie-card.component.html',
  styleUrl: './especie-card.component.scss'
})
export class EspecieCardComponent {

  constructor(private confirmationService: ConfirmationService) { }

  @ViewChild('deleteButton') deleteButton: any

  @Input() especie!: Especie
  @Output() delete: EventEmitter<Especie> = new EventEmitter<Especie>()

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: '¿Eliminar esta especie?',
      accept: () => {
        this.deleteEspecie()
      },
    })
  }

  deleteEspecie() {
    this.delete.emit(this.especie)
  }

  ngOnInit() {

  }

}
