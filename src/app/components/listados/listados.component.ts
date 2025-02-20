import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-listados',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './listados.component.html',
  styleUrl: './listados.component.scss'
})
export class ListadosComponent {

}
