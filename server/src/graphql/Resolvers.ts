/**
 * Apollo GraphQL Server main resolver
 * @author edujed
 */

import {BaseType} from '..//model/BaseType';
import {Zipcode} from '../model/Zipcode';
import {findPostcode} from '../proxy/RestZipcodes';

const suportedCountries = require('../model/suportedCountries.json');

/**
 * Resolver to get one Country from they abbreviation.
 * @author edujed
 * @param abbreviation Country abbreviation
 * @returns the Country, if it was found!
 */
function country(parent, {abbreviation}, ctx): BaseType {
  return suportedCountries.find(
      (f: BaseType) => f.abbreviation == abbreviation);
}

/**
 * Resolver to get the list of all available Countries.
 * @author edujed
 * @returns list of Countries.
 */
function countries(): BaseType[] {
  return suportedCountries;
}

/**
 * Resolver to get the zipcode information.
 * @author edujed
 * @param country the Country abbreviation
 * @param zip the zipcode
 * @returns a zipcode (if they exist)
 */
function zipcode(parent, {country, zip}, ctx): Promise<Zipcode> {
  return findPostcode(country, zip);
}

export const resolvers = {
  Query: {
    country,
    countries,
    zipcode,
  }
}
