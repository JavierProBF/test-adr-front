import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { ADR_METRICS_MOCK_RESPONSE } from '../mocks/adr-metrics.mock';
import { AdrMetricsApiResponse, MonthlyStat } from '../models/adr-metrics.model';


@Injectable({
  providedIn: 'root',
})



export class AdrMetricsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/metrics';

  private readonly INITIAL_RECORDS = ADR_METRICS_MOCK_RESPONSE.totalRecords;
  private readonly INITIAL_STATS: MonthlyStat[] = ADR_METRICS_MOCK_RESPONSE.monthlyStats;

  /**
   * Signals para el estado de las métricas.
   */
  totalRecords = signal<number>(this.INITIAL_RECORDS);
  monthlyStats = signal<MonthlyStat[]>([]);

  /**
   * getMetricsFromServer
   * Obtiene métricas vía GET y usa mock como fallback.
   */
  getMetricsFromServer(): void {
    this.http
      .get<unknown>(this.endpoint)
      .pipe(
        map((response) => this.normalizeMetricsResponse(response)),
        catchError(() => of(ADR_METRICS_MOCK_RESPONSE))
      )
      .subscribe((metrics) => {
        this.totalRecords.set(metrics.totalRecords);
        this.monthlyStats.set(metrics.monthlyStats);
      });
  }

  /**
   * refreshMetrics
   * Simula la actualización de datos existentes.
   */
  refreshMetrics(): void {
    this.totalRecords.update(currentValue => currentValue + Math.floor(Math.random() * 15));
    
    this.monthlyStats.update(currentStats => 
      currentStats.map(stat => ({
        ...stat,
        value: Math.floor(Math.random() * 85) + 10 
      }))
    );
  }

  /**
   * resetMetrics
   * Permite volver a los valores iniciales.
   */
  resetMetrics(): void {
    this.totalRecords.set(this.INITIAL_RECORDS);
    this.monthlyStats.set(this.INITIAL_STATS);
  }

  private normalizeMetricsResponse(response: unknown): AdrMetricsApiResponse {
    if (this.isApiResponse(response)) {
      return response;
    }

    if (Array.isArray(response) && response.every((item) => this.isMonthlyStat(item))) {
      return {
        totalRecords: this.INITIAL_RECORDS,
        monthlyStats: response
      };
    }

    return ADR_METRICS_MOCK_RESPONSE;
  }

  private isApiResponse(response: unknown): response is AdrMetricsApiResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'totalRecords' in response &&
      typeof (response as { totalRecords?: unknown }).totalRecords === 'number' &&
      'monthlyStats' in response &&
      Array.isArray((response as { monthlyStats?: unknown }).monthlyStats) &&
      (response as { monthlyStats: unknown[] }).monthlyStats.every((item) => this.isMonthlyStat(item))
    );
  }

  private isMonthlyStat(item: unknown): item is MonthlyStat {
    return (
      typeof item === 'object' &&
      item !== null &&
      'month' in item &&
      typeof (item as { month?: unknown }).month === 'string' &&
      'value' in item &&
      typeof (item as { value?: unknown }).value === 'number'
    );
  }
}
 