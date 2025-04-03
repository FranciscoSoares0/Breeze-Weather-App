import { Component, inject } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service';
import { CommonModule } from '@angular/common';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';

@Component({
  selector: 'app-forecast',
  imports: [CommonModule,WeatherDetailsComponent],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent {

  private openWeatherService = inject(OpenWeatherService);

  weatherForecast$ = this.openWeatherService.weatherForecast$;

  sortedForecast$ = this.openWeatherService.sortedForecast$;

  constructor(){}
}
