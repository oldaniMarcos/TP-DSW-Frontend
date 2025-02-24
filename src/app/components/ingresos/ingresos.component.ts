import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { Chart, ChartConfiguration, ChartOptions } from 'chart.js';
import { AtencionService } from '../../services/atencion.service.js';
import { Atencion } from '../../../types.js';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingresos',
  standalone: true,
  imports: [ChartModule, CommonModule, FormsModule],
  templateUrl: './ingresos.component.html',
  styleUrl: './ingresos.component.scss'
})
export class IngresosComponent {

  chartRef: Chart | undefined

  @ViewChild('chart') chartCanvas: any;

  ngAfterViewInit(): void {
    this.chartRef = new Chart(this.chartCanvas.nativeElement, {
      type: 'bar',
      data: this.ingresosChartData,
      options: this.chartOptions
    });
  }

  ingresosChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        label: 'Ingresos ($)',
        data: [],
        backgroundColor: '#80d4ff',
        borderColor: '#66c2ff',
        borderWidth: 2
      }
    ]
  };
  
  chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Día'
        }
      },
      y: {
        suggestedMax: 25000,
        title: {
          display: true,
          text: 'Ingresos ($)'
        }
      }
    },
  };

  selectedMonth: string = new Date().toISOString().slice(0, 7);
  atenciones: Atencion[] = [];

  constructor(private atencionService: AtencionService,
  ) {}

  ngOnInit(): void {
    this.findAtenciones();
  }

  findAtenciones(): void {
    this.atencionService.findAll().subscribe((data: Atencion[]) => {
      this.atenciones = data;
      this.updateChart();
    });
  }

  updateChart(): void {
    const selectedYearMonth = this.selectedMonth;
    
    const dailyTotals: { [key: number]: number } = {};

    this.atenciones.forEach((atencion) => {
      const atencionDate = new Date(atencion.fechaHora);
      const yearMonth = atencionDate.toISOString().slice(0, 7);

      if (yearMonth === selectedYearMonth) {
        const day = atencionDate.getDate();
        dailyTotals[day] = (dailyTotals[day] || 0) + atencion.valor;        
      }
    });

    this.ingresosChartData.labels = Array.from({ length: 31 }, (_, i) => i + 1).filter(day => dailyTotals[day]);
    this.ingresosChartData.datasets[0].data = (this.ingresosChartData.labels as number[]).map((day: number) => dailyTotals[day] || 0);

    this.chartRef?.update();
  }
}
