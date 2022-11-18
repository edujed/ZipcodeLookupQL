
import {Zipcode} from '../model/Zipcode';

/**
 * Call the zippopotam.us API with parameters to get the zipcode informations.
 * @author edujed
 * @param country
 * @param postcode
 * @returns the zipcode, or an Error (if a invalid JSON was returned)
 */
export async function findPostcode(
    country: string = 'US', postcode: string = '90210'): Promise<Zipcode> {
  const URL = `https://api.zippopotam.us/${country}/${postcode}`;
  const search = fetch(URL);
  const response = await search;

  return Zipcode.fromJson(await response.json());
}