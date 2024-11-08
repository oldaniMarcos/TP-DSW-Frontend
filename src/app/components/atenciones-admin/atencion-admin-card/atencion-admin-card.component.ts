import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-atencion-admin-card',
  standalone: true,
  imports: [],
  templateUrl: './atencion-admin-card.component.html',
  styleUrl: './atencion-admin-card.component.scss'
})
export class AtencionAdminCardComponent {
  @Input() idAtencion!: number
  @Input() fechaHora!: string
  @Input() resultado!: string
  @Input() observaciones!: string

 // @Input() nombreYApellido!: string //del cliente
}
