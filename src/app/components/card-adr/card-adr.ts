import { Component, inject, OnInit } from '@angular/core';
import { AdrRecordsService } from '../../services/adr-records.service';

@Component({
  selector: 'app-card-adr',
  imports: [],
  templateUrl: './card-adr.html',
  styleUrl: './card-adr.css',
})
export class CardAdr implements OnInit {
  private readonly adrRecordsService = inject(AdrRecordsService);
  totalRecords = this.adrRecordsService.totalRecords;

  ngOnInit(): void {
    this.adrRecordsService.refreshTotalRecords();
  }

}
