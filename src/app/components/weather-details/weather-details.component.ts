import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { WeatherEntry } from '../../interfaces/forecast';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-weather-details',
  imports: [MatIconModule,CommonModule],
  templateUrl: './weather-details.component.html',
  styleUrl: './weather-details.component.css'
})
export class WeatherDetailsComponent {

  weather = input<WeatherEntry | null>(null);

}
