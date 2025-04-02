import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { City, FindCitiesResponse } from '../interfaces/city';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { WeatherData } from '../interfaces/forecast';

@Injectable({
  providedIn: 'root',
})
export class OpenWeatherService {
  private http = inject(HttpClient);

  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor() {}

  locationsSearch$ = new BehaviorSubject<FindCitiesResponse | null>(null);
  selectedLocation$ = new BehaviorSubject<City | null>(null);

  getWeatherByCityName(city: string): Observable<FindCitiesResponse | null> {
    if(!city.trim())
      return of(null);

    const url = `${this.apiUrl}/find?q=${city}&appid=${this.apiKey}`;
    return this.http
      .get<FindCitiesResponse>(url)
      .pipe(
        tap((data) => this.locationsSearch$.next(data)),
        catchError((error) => {
          this.locationsSearch$.next(null);
          return of(null);
        })
      );
  }

  weatherForecast$ = this.selectedLocation$.pipe(
    switchMap((location) => {
      if (!location) return of(null);
      const { lat, lon } = location.coord;
      return this.http.get<WeatherData>(`${this.apiUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`);
    }),
    shareReplay(1)
  )

}
