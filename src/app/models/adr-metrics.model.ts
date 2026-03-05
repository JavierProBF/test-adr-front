export interface MonthlyStat {
  month: string;
  value: number;
}

export interface AdrMetricsApiResponse {
  totalRecords: number;
  monthlyStats: MonthlyStat[];
}
