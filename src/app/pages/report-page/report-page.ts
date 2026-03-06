import { Component, signal, AfterViewInit, ViewChild, ElementRef, effect } from '@angular/core';

// Declaración global para Chart.js
declare var Chart: any;

@Component({
  selector: 'app-report-page',
  imports: [],
  templateUrl: './report-page.html',
  styleUrl: './report-page.css',
})
export class ReportPage {
 @ViewChild('lineChart') lineChartRef!: ElementRef;
  @ViewChild('barChart') barChartRef!: ElementRef;
  @ViewChild('radarChart') radarChartRef!: ElementRef;
  @ViewChild('doughnutChart') doughnutChartRef!: ElementRef;
  @ViewChild('polarChart') polarChartRef!: ElementRef;

  totalProyectos = signal(145);
  activos = signal(32);
  desviacion = signal(5.4);
  gobierno = signal(92.1);
  chartJsLoaded = false;

  proyectosDetalle = signal([
    { id: 101, sigla: 'KN', nombre: 'Kaisen Network', gobierno: 95, desviacion: 2.1 },
    { id: 204, sigla: 'BS', nombre: 'Bushidō Sphere', gobierno: 88, desviacion: 8.5 },
    { id: 312, sigla: 'RN', nombre: 'Ronin Cloud', gobierno: 92, desviacion: 4.2 }
  ]);

  ngAfterViewInit() {
    this.loadChartJs().then(() => {
      this.chartJsLoaded = true;
      setTimeout(() => this.initAllCharts(), 200);
    });
  }

  private loadChartJs(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof Chart !== 'undefined') return resolve();
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = () => resolve();
      script.onerror = (e) => reject(e);
      document.head.appendChild(script);
    });
  }

  initAllCharts() {
    this.initLineChart();
    this.initBarChart();
    this.initRadarChart();
    this.initDoughnutChart();
    this.initPolarChart();
  }

  initLineChart() {
    new Chart(this.lineChartRef.nativeElement.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
          data: [20, 45, 30, 80, 55, 95],
          borderColor: '#bc002d',
          backgroundColor: 'rgba(188, 0, 45, 0.04)',
          fill: true,
          tension: 0.4,
          borderWidth: 4,
          pointRadius: 0
        }]
      },
      options: this.getBasicOptions(false)
    });
  }

  initBarChart() {
    new Chart(this.barChartRef.nativeElement.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Cloud', 'Sec', 'Infra', 'UX'],
        datasets: [{
          data: [58, 32, 45, 10],
          backgroundColor: ['#0f172a', '#2563eb', '#bc002d', '#94a3b8'],
          borderRadius: 4
        }]
      },
      options: this.getBasicOptions(true)
    });
  }

  initRadarChart() {
    new Chart(this.radarChartRef.nativeElement.getContext('2d'), {
      type: 'radar',
      data: {
        labels: ['Integ', 'Están', 'Rigor', 'Docs', 'Budg'],
        datasets: [{
          data: [95, 85, 92, 70, 88],
          borderColor: '#bc002d',
          backgroundColor: 'rgba(188, 0, 45, 0.15)',
          borderWidth: 3,
          pointRadius: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.1)' },
            angleLines: { color: 'rgba(255,255,255,0.1)' },
            pointLabels: { color: '#64748b', font: { size: 9, weight: 'bold' } },
            ticks: { display: false }
          }
        }
      }
    });
  }

  initDoughnutChart() {
    new Chart(this.doughnutChartRef.nativeElement.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Live', 'Prog', 'Atras'],
        datasets: [{
          data: [65, 25, 10],
          backgroundColor: ['#10b981', '#2563eb', '#bc002d'],
          borderWidth: 0,
          cutout: '70%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { usePointStyle: true, font: { size: 10, weight: 'bold' } } } }
      }
    });
  }

  initPolarChart() {
    new Chart(this.polarChartRef.nativeElement.getContext('2d'), {
      type: 'polarArea',
      data: {
        labels: ['Tech', 'Op', 'Leg', 'Fin', 'Sec'],
        datasets: [{
          data: [12, 19, 8, 15, 22],
          backgroundColor: ['rgba(15,23,42,0.7)', 'rgba(37,99,235,0.7)', 'rgba(188,0,45,0.7)', 'rgba(148,163,184,0.7)', 'rgba(16,185,129,0.7)']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { r: { ticks: { display: false }, grid: { color: '#f1f5f9' } } }
      }
    });
  }

  private getBasicOptions(showScales: boolean) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: showScales ? {
        y: { ticks: { font: { size: 9, weight: 'bold' } }, grid: { color: '#f1f5f9' } },
        x: { ticks: { font: { size: 9, weight: 'bold' } }, grid: { display: false } }
      } : {
        y: { display: false },
        x: { grid: { display: false }, ticks: { font: { size: 10, weight: 'bold' }, color: '#94a3b8' } }
      }
    };
  }
}
