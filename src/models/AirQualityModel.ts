import { AirQualityData, City } from './types';

const BASE_URL = 'https://air-quality-api.open-meteo.com/v1/airquality';

export async function fetchAirQuality(
  city: City,
  date: string,
  hoursExposure: number
): Promise<AirQualityData> {
  const url = `${BASE_URL}?latitude=${city.latitude}&longitude=${city.longitude}&hourly=pm2_5&start_date=${date}&end_date=${date}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Error al consultar la API de calidad del aire');

  const data = await response.json();
  const pm25Values: (number | null)[] = data.hourly.pm2_5;

  const valid = pm25Values.filter((v): v is number => v !== null);
  if (valid.length === 0) throw new Error('No hay datos de PM2.5 para la fecha seleccionada');

  const avgPm25 = valid.reduce((sum, v) => sum + v, 0) / valid.length;
  const exposureIndex = avgPm25 * hoursExposure;

  const riskLevel =
    exposureIndex < 100 ? 'Bajo' : exposureIndex <= 200 ? 'Moderado' : 'Alto';

  return { avgPm25, exposureIndex, riskLevel };
}
