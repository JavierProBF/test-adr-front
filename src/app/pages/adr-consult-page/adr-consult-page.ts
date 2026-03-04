import { Component, signal, computed } from '@angular/core';
import { CardsSelection } from "../../components/cards-selection/cards-selection";
import { CardAdr } from "../../components/card-adr/card-adr";

@Component({
  selector: 'app-adr-consult-page',
  imports: [CardsSelection, CardAdr],
  templateUrl: './adr-consult-page.html',
  styleUrl: './adr-consult-page.css',
})
export class AdrConsultPage {

  monthlyStats = signal([
    { month: 'Ene', value: 30 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 42 },
    { month: 'Abr', value: 85 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 95 },
    { month: 'Jul', value: 75 }
  ]);

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

    this.monthlyStats.update(stats => 
      stats.map(s => ({
        ...s,
        value: Math.floor(Math.random() * 80) + 10
      }))
    );
  }
}
