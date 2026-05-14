import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherData } from '../../../../core/models/weather.model';

@Component({
  selector: 'app-card-clima',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-clima.component.html',
  styleUrl: './card-clima.component.scss'
})
export class CardClimaComponent {
  // Recebe os dados processados do componente pai (Home)
  dados = input<WeatherData | null>(null);
}
