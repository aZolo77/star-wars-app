// сервисный класс
export default class SwapiService {
  // private props
  _apiBase = 'https://swapi.co/api';
  _imageUrlBase = 'https://starwars-visualguide.com/assets/img/';

  // get ID from URL
  _extractId = item => {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  };

  // transform Data about Planet [private]
  _transformPlanet = planet => {
    return {
      id: this._extractId(planet),
      name: planet.name,
      population: planet.population,
      rotationPeriod: planet.rotation_period,
      diameter: planet.diameter
    };
  };

  // transform Data about Person [private]
  _transformPerson = person => {
    return {
      id: this._extractId(person),
      name: person.name,
      gender: person.gender,
      birthYear: person.birth_year,
      eyeColor: person.eye_color
    };
  };

  // transform Data about Starship [private]
  _transformStarship = ship => {
    return {
      id: this._extractId(ship),
      name: ship.name,
      model: ship.model,
      manufacturer: ship.manufacturer,
      costInCredits: ship.cost_in_credits,
      length: ship.length,
      crew: ship.crew,
      passengers: ship.passengers,
      cargoCapacity: ship.cargo_capacity
    };
  };

  // Request to API
  getResource = async url => {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch \n Received ${res.status}`);
    }

    return await res.json();
  };

  // ===== get All Heroes =======================
  getAllPeople = async () => {
    const res = await this.getResource('/people/');
    const arr = res.results.slice(0, 6);
    return arr.map(this._transformPerson);
  };

  // get one Hero
  getPerson = async id => {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  };

  // ===== get All Planets =======================
  getAllPlanets = async () => {
    const res = await this.getResource('/planets/');
    const arr = res.results.slice(0, 6);
    return arr.map(this._transformPlanet);
  };

  // get one Planet
  getPlanet = async id => {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  };

  // ===== get All StarShips ======================
  getAllStarships = async () => {
    const res = await this.getResource('/starships/');
    const arr = res.results.slice(0, 6);
    return arr.map(this._transformStarship);
  };

  // get one StarShip
  getStarship = async id => {
    const ship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(ship);
  };

  // get images URL
  getPersonImage = ({ id }) => {
    return `${this._imageUrlBase}characters/${id}.jpg`;
  };

  getPlanetImage = ({ id }) => {
    return `${this._imageUrlBase}planets/${id}.jpg`;
  };

  getStarshipImage = ({ id }) => {
    return `${this._imageUrlBase}starships/${id}.jpg`;
  };
}
