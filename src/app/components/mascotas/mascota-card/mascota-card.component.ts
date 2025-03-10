import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Animal } from '../../../../types';
import { FormsModule } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AtencionService } from '../../../services/atencion.service';

@Component({
  selector: 'app-mascota-card',
  standalone: true,
  imports: [FormsModule, ConfirmPopupModule, ToastModule, ButtonModule],
  templateUrl: './mascota-card.component.html',
  styleUrl: './mascota-card.component.scss',
  providers: [MessageService]
})
export class MascotaCardComponent {

  constructor(
    private confirmationService: ConfirmationService,
    private atencionService: AtencionService,
    private messageService: MessageService
  ) {}

  @ViewChild('deleteButton') deleteButton: any;

  @Input() animal!: Animal;

  @Output() edit: EventEmitter<Animal> = new EventEmitter<Animal>();
  @Output() delete: EventEmitter<Animal> = new EventEmitter<Animal>();
  @Output() select: EventEmitter<Animal> = new EventEmitter<Animal>();

  age: number | null = null;

  editMascota() {
    this.edit.emit(this.animal);
  }

  confirmDelete() {
    if (!this.animal.nroHistClinica) {
      return;
    }
  
    this.atencionService.hasAnimal(this.animal.nroHistClinica).subscribe((tieneAtenciones) => {
      if (tieneAtenciones) {
        this.messageService.add({ severity: 'warn', summary: 'No se puede eliminar', detail: 'Este animal tiene atenciones registradas.' });
      } else {
        this.confirmationService.confirm({
          target: this.deleteButton.nativeElement,
          message: '¿Eliminar este animal?',
          accept: () => {
            this.deleteMascota();
          },
        });
      }
    });
  }
  

  deleteMascota() {
    this.delete.emit(this.animal);
  }

  selectMascota() {
    this.select.emit(this.animal);
  }

  ngOnInit() {
    if (this.animal?.fechaNac) {
      this.calculateAge(this.animal.fechaNac);
    }
  }

  calculateAge(birthDat: string) {
    const birthDate = new Date(birthDat);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const mes = today.getMonth() - birthDate.getMonth();

    if (mes < 0 || (mes === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    this.age = age;
  }
}
