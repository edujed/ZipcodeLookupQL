/**
 * Static 'builder' to reorganize the external JSON (from zippopotam.us)
 * in an extensible way (to better GraphQL integration with other/future
 * modules/datasources).
 * @author edujed
 */

import {BaseType} from './BaseType';

export class Country extends BaseType {
  static fromJson(country: any) {
    const {'country': name, 'country abbreviation': abbreviation} = country;
    return new this(name, abbreviation);
  }
};