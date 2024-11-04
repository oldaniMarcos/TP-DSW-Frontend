import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteCardComponent } from './cliente-card/cliente-card.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [CommonModule, ClienteCardComponent],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent {
  clientes = [
    {
      dni: 42959191,
      nombre: 'Tomas',
      apellido: 'Gigli',
      telefono: 123123,
      direccion: "Dorrego",
      email:"tomasgigli@gmail.com"
    },
    {
      dni: 123123,
      nombre: 'Juan',
      apellido: 'Ramirez',
      telefono: 234234,
      direccion: "La plata",
      email:"juanramirez@gmail.com"
    },
  ];
  mostrarModal: boolean = false;
  toggleModal(): void {
    this.mostrarModal = !this.mostrarModal;
  }  
}
