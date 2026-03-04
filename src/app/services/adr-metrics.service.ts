import { Injectable, signal} from '@angular/core';

export interface MonthlyStat {
  month: string;
  value: number;
}


@Injectable({
  providedIn: 'root',
})



export class AdrMetricsService {
  // --- Datos Mock (Simulados) ---
  private readonly INITIAL_RECORDS = 1250;
  private readonly INITIAL_STATS: MonthlyStat[] = [
    { month: 'Ene', value: 30 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 42 },
    { month: 'Abr', value: 85 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 95 },
    { month: 'Jul', value: 75 }
  ];

  /**
   * totalRecords: Signal que mantiene el contador total de registros.
   * Se inicializa con el valor mock.
   */
  totalRecords = signal<number>(this.INITIAL_RECORDS);

  /**
   * monthlyStats: Signal que contiene el array de estadísticas para la gráfica.
   * El uso de señales aquí permite que cualquier componente suscrito se actualice
   * automáticamente cuando el array cambie.
   */
  monthlyStats = signal<MonthlyStat[]>(this.INITIAL_STATS);

  /**
   * refreshMetrics
   * Simula la actualización de datos (como si vinieran de un WebSocket o API).
   * Utiliza el método .update() de los signals para modificar el estado basado en el valor anterior.
   */
  refreshMetrics(): void {
    // 1. Actualizamos el contador total con un incremento aleatorio (0-14)
    this.totalRecords.update(currentValue => currentValue + Math.floor(Math.random() * 15));
    
    // 2. Actualizamos los valores de la gráfica con nuevos números aleatorios
    this.monthlyStats.update(currentStats => 
      currentStats.map(stat => ({
        ...stat,
        value: Math.floor(Math.random() * 85) + 10 // Genera valores entre 10 y 95
      }))
    );
  }

  /**
   * resetMetrics
   * Permite volver a los valores iniciales del Mock.
   */
  resetMetrics(): void {
    this.totalRecords.set(this.INITIAL_RECORDS);
    this.monthlyStats.set(this.INITIAL_STATS);
  }
}
 