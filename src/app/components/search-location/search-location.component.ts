import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { OpenWeatherService } from '../../services/open-weather.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { City } from '../../interfaces/city';

@Component({
  selector: 'app-search-location',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './search-location.component.html',
  styleUrl: './search-location.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchLocationComponent {
  private openWeatherService = inject(OpenWeatherService);

  search$ = new BehaviorSubject<string>('');
  selectedLocation$ = this.openWeatherService.selectedLocation$;

  locations$ = this.search$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((searchValue:string) => 
      this.openWeatherService.getWeatherByCityName(searchValue))
  )

  constructor(){}

  HandleKeyUp(event: KeyboardEvent) {
    const inputValue = (event.target as HTMLInputElement).value;
    this.search$.next(inputValue)
  }

  onCitySelected(location: City) {
    this.openWeatherService.selectedLocation$.next(location);
  }
  
  displayCityName(city: City | null):string {
    return city ? `${city.name}, ${city.sys.country}` : '';
  };
}
