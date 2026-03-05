import { Component, computed, inject, OnInit } from '@angular/core';
import { CardAdr } from "../../components/card-adr/card-adr";
import { AdrMetricsService } from '../../services/adr-metrics.service';
import { AdrTable } from "../../components/adr-table/adr-table";

@Component({
  selector: 'app-adr-consult-page',
  imports: [CardAdr, AdrTable],
  templateUrl: './adr-consult-page.html',
  styleUrl: './adr-consult-page.css',
})
export class AdrConsultPage implements OnInit {
  private readonly adrMetricsService = inject(AdrMetricsService);

  monthlyStats = this.adrMetricsService.monthlyStats;

  ngOnInit(): void {
    this.adrMetricsService.getMetricsFromServer();
  }

  // Cálculo derivado para el trazo de la línea (SVG Path)
  linePath = computed(() => {
    const stats = this.monthlyStats();
    return stats.reduce((path, item, i) => {
      const x = (i / (stats.length - 1)) * 1000;
      const y = 200 - (item.value / 100 * 160 + 20); // Escala para viewBox de 200px de alto
      return i === 0 ? `M ${x} ${y}` : `${path} L ${x} ${y}`;
    }, '');
  });

  // Cálculo derivado para el sombreado del área
  areaPath = computed(() => {
    const line = this.linePath();
    if (!line) return '';
    // Cerramos el trazado hacia la base del SVG para crear el polígono de área
    return `${line} L 1000 200 L 0 200 Z`;
  });

  // Simulación de actualización de datos
  randomizeData() {
    this.adrMetricsService.refreshMetrics();
  }
}
