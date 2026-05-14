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
        // Armazena o código do ícone (ex: '01d' ou '01n') para checar o período do dia
        const iconCode = res.weather[0].icon;
        // Captura a temperatura arredondada para processar o calor extremo
        const temperatura = Math.round(res.main.temp);

        return {
          city: res.name,
          temp: temperatura,
          feelsLike: Math.round(res.main.feels_like),
          humidity: res.main.humidity,
          description: res.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${iconCode}@2x.png`,
          condition: res.weather[0].main,
          // Se o código do ícone terminar com a letra 'n' (night), significa que é noite na cidade buscada
          isNoite: iconCode.endsWith('n'),
          // Retorna verdadeiro se a temperatura atingir ou passar de 30°C
          isQuente: temperatura >= 30
        };
      })
    );
  }
}
