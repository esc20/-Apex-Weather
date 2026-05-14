import { Component, inject, signal, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componentes das Features
import { BuscaCidadeComponent } from '../../features/clima/components/busca-cidade/busca-cidade.component';
import { CardClimaComponent } from '../../features/clima/components/card-clima/card-clima.component';

// Services e Models
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

  // Signal que gerencia o estado do clima na tela
  climaAtual = signal<WeatherData | null>(null);

  // Função disparada quando o componente de busca emite uma cidade
  buscarClima(cidade: string) {
    this.weatherService.getWeather(cidade).subscribe({
      next: (dados) => {
        this.climaAtual.set(dados);
        // Passamos o objeto completo de dados para avaliar clima, período e calor
        this.atualizarTemaVisual(dados);
      },
      error: (err) => {
        console.error('Cidade ou formato inválido (use apenas cidades):', err);
        // CORREÇÃO DE SENIOR: Reseta o card e limpa o body para o visual original neutro não quebrar
        this.climaAtual.set(null);
        this.limparClassesDoBody();
      }
    });
  }

  // Altera as classes do body dinamicamente com base no clima, hora local e calor
  private atualizarTemaVisual(dados: WeatherData) {
    // 1. Limpa todas as classes antigas do body de forma isolada
    this.limparClassesDoBody();

    // 2. Aplica o tema de Período (Dia ou Noite)
    if (dados.isNoite) {
      this.renderer.addClass(document.body, 'theme-noite');
    } else {
      this.renderer.addClass(document.body, 'theme-dia');
    }

    // 3. Aplica o tema de Condição Climática
    const condicao = dados.condition.toLowerCase();
    if (condicao === 'rain' || condicao === 'drizzle' || condicao === 'thunderstorm') {
      this.renderer.addClass(document.body, 'theme-rain');
    } else if (condicao === 'clouds') {
      this.renderer.addClass(document.body, 'theme-clouds');
    }

    // 4. Aplica o tema de Calor Extremo se a temperatura for >= 30°C
    if (dados.isQuente) {
      this.renderer.addClass(document.body, 'theme-hot');
    }
  }

  // Método auxiliar criado para centralizar a limpeza e evitar código duplicado
  private limparClassesDoBody() {
    this.renderer.removeClass(document.body, 'theme-dia');
    this.renderer.removeClass(document.body, 'theme-noite');
    this.renderer.removeClass(document.body, 'theme-rain');
    this.renderer.removeClass(document.body, 'theme-clouds');
    this.renderer.removeClass(document.body, 'theme-hot');
  }
}
