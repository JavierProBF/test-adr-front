import { Component, inject, OnInit } from '@angular/core';
import { AdrMetricsService } from '../../services/adr-metrics.service';

@Component({
  selector: 'app-card-adr',
  imports: [],
  templateUrl: './card-adr.html',
  styleUrl: './card-adr.css',
})
export class CardAdr implements OnInit {
  private readonly adrMetricsService = inject(AdrMetricsService);
  totalRecords = this.adrMetricsService.totalRecords;

  ngOnInit(): void {
    this.adrMetricsService.getMetricsFromServer();
  }

}
