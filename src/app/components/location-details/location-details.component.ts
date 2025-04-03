import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ForecastComponent } from '../forecast/forecast.component';
import { WeatherDetailsComponent } from '../weather-details/weather-details.component';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule,MatIconModule,ForecastComponent,WeatherDetailsComponent],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class LocationDetailsComponent {

  private openWeatherService = inject(OpenWeatherService);

  weatherForecast$ = this.openWeatherService.weatherForecast$;

  now_date = signal<string>(this.getFormattedDateTime())

  constructor(){
    this.weatherForecast$.subscribe((data) => {
      console.log(data)
    });

  }

  private getFormattedDateTime(): string {
    const now = new Date();
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', // Apr
      day: 'numeric', // 2
      hour: 'numeric', // 08
      minute: 'numeric', // 34
      hour12: true, // PM/AM
    }).format(now);
  }

  fahrenheitToCelsius(fahrenheit: number): number {
    return ((fahrenheit - 32) * 5) / 9;
  }
}
