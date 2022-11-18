/**
 * Static 'builder' to reorganize the external JSON (from zippopotam.us)
 * in an extensible way (to better GraphQL integration with other/future
 * modules/datasources).
 * @author edujed
 */

import {BaseType} from './BaseType';

export class State extends BaseType {
  static fromJson(json: any) {
    const {'state': name, 'state abbreviation': abbreviation} = json;
    return new this(name, abbreviation);
  }
};
