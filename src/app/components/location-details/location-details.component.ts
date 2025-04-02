import { Component, inject, signal } from '@angular/core';
import { OpenWeatherService } from '../../services/open-weather.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-location-details',
  imports: [CommonModule],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css'
})
export class LocationDetailsComponent {

  private openWeatherService = inject(OpenWeatherService);

  selectedLocation$ = this.openWeatherService.selectedLocation$;

  weatherForecast$ = this.openWeatherService.weatherForecast$;

  now_date = signal<string>(this.getFormattedDateTime())

  constructor(){
    this.weatherForecast$.subscribe((data) => {
      console.log(data)
    })
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
