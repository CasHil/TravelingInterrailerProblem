import cities from "../data/cities.json";

export type City = {
  name: string;
  lat: number;
  lng: number;
};

function getCityCoordinates(citiesToVisit: Array<string>) {
  const parsedCities: Array<City> = JSON.parse(JSON.stringify(cities));
  return parsedCities.filter((city: City) => citiesToVisit.includes(city.name));
}

export { getCityCoordinates };
