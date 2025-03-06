import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Insumo, TipoInsumo } from '../../../../types';
import { DialogModule } from 'primeng/dialog';
import { InsumoService } from '../../../services/insumo.service';

@Component({
  selector: 'app-insumo-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './insumo-ver-popup.component.html',
  styleUrl: './insumo-ver-popup.component.scss'
})
export class InsumoVerPopupComponent {

  constructor(
    private insumoService: InsumoService
  ) { }

  @Input() display: boolean = false

  @Input() insumo!: Insumo
  @Input() tipoInsumo!: TipoInsumo

  @Output() displayChange = new EventEmitter<boolean>()

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
