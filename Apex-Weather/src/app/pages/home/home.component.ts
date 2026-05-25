import { Component, inject, signal, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuscaCidadeComponent } from '../../features/clima/components/busca-cidade/busca-cidade.component';
import { CardClimaComponent } from '../../features/clima/components/card-clima/card-clima.component';
import { WeatherService } from '../../core/services/weather.service';
import { WeatherData } from '../../core/models/weather.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, BuscaCidadeComponent, CardClimaComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private weatherService = inject(WeatherService);
  private renderer = inject(Renderer2);
  climaAtual = signal<WeatherData | null>(null);
  buscarClima(cidade: string) {
    this.weatherService.getWeather(cidade).subscribe({
      next: (dados) => {
        this.climaAtual.set(dados);
        this.atualizarTemaVisual(dados);
      },
      error: (err) => {
        console.error('Cidade ou formato inválido (use apenas cidades):', err);
        this.climaAtual.set(null);
        this.limparClassesDoBody();
      }
    });
  }

  private atualizarTemaVisual(dados: WeatherData) {
    this.limparClassesDoBody();

    if (dados.isNoite) {
      this.renderer.addClass(document.body, 'theme-noite');
    } else {
      this.renderer.addClass(document.body, 'theme-dia');
    }

    const condicao = dados.condition.toLowerCase();
    if (condicao === 'rain' || condicao === 'drizzle' || condicao === 'thunderstorm') {
      this.renderer.addClass(document.body, 'theme-rain');
    } else if (condicao === 'clouds') {
      this.renderer.addClass(document.body, 'theme-clouds');
    }

    if (dados.isQuente) {
      this.renderer.addClass(document.body, 'theme-hot');
    }
  }

  private limparClassesDoBody() {
    this.renderer.removeClass(document.body, 'theme-dia');
    this.renderer.removeClass(document.body, 'theme-noite');
    this.renderer.removeClass(document.body, 'theme-rain');
    this.renderer.removeClass(document.body, 'theme-clouds');
    this.renderer.removeClass(document.body, 'theme-hot');
  }
}
