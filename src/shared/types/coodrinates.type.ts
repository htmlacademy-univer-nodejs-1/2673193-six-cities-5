import { City } from './cities.enum.js';

export type Coordinates = {
  latitude: number;
  longitude: number;
}

export const CITY_COORDINATES: Record<City, Coordinates> = {
  [City.Paris]: { latitude: 48.85661, longitude: 2.351499 },
  [City.Cologne]: { latitude: 50.938361, longitude: 6.959974 },
  [City.Brussels]: { latitude: 50.846557, longitude: 4.351697 },
  [City.Amsterdam]: { latitude: 52.370216, longitude: 4.895168 },
  [City.Hamburg]: { latitude: 53.550341, longitude: 10.000654 },
  [City.Dusseldorf]: { latitude: 51.225402, longitude: 6.776314 }
};

//   Paris = '48.85661,2.351499',
//   Cologne = '50.938361,6.959974',
//   Brussels = '50.846557,4.351697',
//   Amsterdam = '52.370216,4.895168',
//   Hamburg = '53.550341,10.000654',
//   Dusseldorf = '51.225402,6.776314'
