import {Component} from '@angular/core';
import { SearchLocationComponent } from '../search-location/search-location.component';
import { LocationDetailsComponent } from '../location-details/location-details.component';

@Component({
  selector: 'app-home',
  imports: [SearchLocationComponent,LocationDetailsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent{}
