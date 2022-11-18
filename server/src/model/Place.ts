/**
 * Static 'builder' to reorganize the external JSON (from zippopotam.us)
 * in an extensible way (to better GraphQL integration with other/future
 * modules/datasources).
 * @author edujed
 */

import {State} from './State';

export class Place {
  city: string;
  latitude: string;
  longitude: string;
  state?: State;

  constructor(
      city: string, latitude: string, longitude: string,
      state: State|null = null) {
    this.city = city;
    this.latitude = latitude;
    this.longitude = longitude;
    this.state = state;
  }

  static fromJson(place: any) {
    const {'place name': name, latitude, longitude} = place;
    const state = State.fromJson(place);
    return new Place(name, latitude, longitude, state);
  }
};
