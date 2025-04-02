export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface MainWeatherData {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  }
  
  export interface CityCoord {
    lon: number;
    lat: number;
  }
  
  export interface Sys {
    country: string;
    sunrise: number;
    sunset: number;
  }
  
  export interface City {
    id: number;
    name: string;
    coord: CityCoord;
    main: MainWeatherData;
    weather: Weather[];
    sys: Sys;
    timezone: number;
    dt: number;
  }
  
  export interface FindCitiesResponse {
    message: string;
    cod: string;
    count: number;
    list: City[];
  }
  