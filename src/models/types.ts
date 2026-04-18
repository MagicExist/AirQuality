export interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export interface AirQualityData {
  avgPm25: number;
  exposureIndex: number;
  riskLevel: 'Bajo' | 'Moderado' | 'Alto';
}
