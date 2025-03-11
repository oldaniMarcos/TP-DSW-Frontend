import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Insumo, TipoInsumo } from '../../../../types';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-insumo-ver-popup',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './insumo-ver-popup.component.html',
  styleUrl: './insumo-ver-popup.component.scss'
})
export class InsumoVerPopupComponent {

  @Input() display: boolean = false

  @Input() supply!: Insumo
  @Input() supplyType!: TipoInsumo

  @Output() displayChange = new EventEmitter<boolean>()

  onClose() {
    this.display = false
    this.displayChange.emit(this.display)
  }

}
