import { AdrMetricsApiResponse } from '../models/adr-metrics.model';

export const ADR_METRICS_MOCK_RESPONSE: AdrMetricsApiResponse = {
  totalRecords: 1250,
  monthlyStats: [
    { month: 'Ene', value: 30 },
    { month: 'Feb', value: 55 },
    { month: 'Mar', value: 42 },
    { month: 'Abr', value: 85 },
    { month: 'May', value: 60 },
    { month: 'Jun', value: 95 },
    { month: 'Jul', value: 75 }
  ]
};
