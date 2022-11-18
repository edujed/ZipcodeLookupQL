/**
 * Fully GraphQL correspondence for Zipcode Resolver, with static method to
 * 'translate' the external JSON to our models.
 * @author edujed
 */

import {Country} from './Country';
import {Place} from './Place'

export class Zipcode {
  postcode: string;
  places: Place[];
  country?: Country;

  constructor(
      postcode: string, country: Country|null = null, places: Place[] = []) {
    this.country = country;
    this.places = places;
    this.postcode = postcode;
  }

  static fromJson(json: any) {
    const {'post code': postcode, places} = json;
    if (!postcode || !places?.map) throw new Error('invalid response format!');

    const country = Country.fromJson(json);
    const placeList: Place[] = places.map(Place.fromJson);
    return new Zipcode(postcode, country, placeList);
  }
};