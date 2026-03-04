import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';
import { AdrRecordsApiResponse } from '../models/adr-records.model';
import { ADR_RECORDS_MOCK_RESPONSE } from '../mocks/adr-records.mock';

@Injectable({
  providedIn: 'root'
})
export class AdrRecordsService {
  private readonly http = inject(HttpClient);
  private readonly endpoint = '/api/adr-records';

  totalRecords = signal<number>(ADR_RECORDS_MOCK_RESPONSE.totalRecords);

  refreshTotalRecords(): void {
    this.http
      .get<unknown>(this.endpoint)
      .pipe(
        map((response) => this.extractTotalRecords(response)),
        catchError(() => of(ADR_RECORDS_MOCK_RESPONSE.totalRecords))
      )
      .subscribe((total) => {
        this.totalRecords.set(total);
      });
  }

  private extractTotalRecords(response: unknown): number {
    if (Array.isArray(response)) {
      return response.length;
    }

    if (this.isApiResponse(response)) {
      return response.totalRecords;
    }

    return ADR_RECORDS_MOCK_RESPONSE.totalRecords;
  }

  private isApiResponse(response: unknown): response is AdrRecordsApiResponse {
    return (
      typeof response === 'object' &&
      response !== null &&
      'totalRecords' in response &&
      typeof (response as { totalRecords?: unknown }).totalRecords === 'number'
    );
  }
}
