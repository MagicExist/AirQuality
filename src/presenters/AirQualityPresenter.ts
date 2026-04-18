import { fetchAirQuality } from '../models/AirQualityModel';
import { AirQualityData, City } from '../models/types';

export interface PresenterCallbacks {
  onLoading: () => void;
  onSuccess: (result: AirQualityData) => void;
  onError: (message: string) => void;
}

export function createAirQualityPresenter(callbacks: PresenterCallbacks) {
  return {
    async handleSubmit(city: City, date: string, hoursExposure: number) {
      if (!city || !date || hoursExposure <= 0) {
        callbacks.onError('Por favor completa todos los campos correctamente.');
        return;
      }

      callbacks.onLoading();

      try {
        const result = await fetchAirQuality(city, date, hoursExposure);
        callbacks.onSuccess(result);
      } catch (error: any) {
        callbacks.onError(error.message ?? 'Error inesperado');
      }
    },
  };
}
