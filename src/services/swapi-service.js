// сервисный класс
export default class SwapiService {
  // private props
  _apiBase = 'https://swapi.co/api';

  // get ID from URL
  _extractId(item) {
    const idRegExp = /\/([0-9]*)\/$/;
    return item.url.match(idRegExp)[1];
  }

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
  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch \n Received ${res.status}`);
    }

    return await res.json();
  }

  // ===== get All Heroes =======================
  async getAllPeople() {
    const res = await this.getResource('/people/');
    return res.results.map(this._transformPerson);
  }

  // get one Hero
  async getPerson(id) {
    const person = await this.getResource(`/people/${id}`);
    return this._transformPerson(person);
  }

  // ===== get All Planets =======================
  async getAllPlanets() {
    const res = await this.getResource('/planets/');
    return res.results.map(this._transformPlanet);
  }

  // get one Planet
  async getPlanet(id) {
    const planet = await this.getResource(`/planets/${id}`);
    return this._transformPlanet(planet);
  }

  // ===== get All StarShips ======================
  async getAllStarships() {
    const res = await this.getResource('/starships/');
    return res.results.map(this._transformStarship);
  }

  // get one StarShip
  async getStarship(id) {
    const ship = await this.getResource(`/starships/${id}`);
    return this._transformStarship(ship);
  }
}
