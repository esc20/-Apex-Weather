import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { WeatherData } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private http = inject(HttpClient);
  private readonly API_KEY = '46b1ca78d3d9c853373240323dff2046'; 
  private readonly BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  getWeather(city: string): Observable<WeatherData> {
    const params = {
      q: city,
      units: 'metric',
      lang: 'pt_br',
      appid: this.API_KEY
    };

    return this.http.get<any>(this.BASE_URL, { params }).pipe(
      map(res => {
        const iconCode = res.weather[0].icon;
        const temperatura = Math.round(res.main.temp);

        return {
          city: res.name,
          temp: temperatura,
          feelsLike: Math.round(res.main.feels_like),
          humidity: res.main.humidity,
          description: res.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
          condition: res.weather[0].main,
          isNoite: iconCode.endsWith('n'),
          isQuente: temperatura >= 30
        };
      })
    );
  }
}
