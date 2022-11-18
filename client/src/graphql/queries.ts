export const countryQuery: string = `
  query {
    countries { abbreviation, name }
  }`;

export function getZipcodeQuery(country: string, zipcode: string) {
  return `
  query {
    zipcode(country: "${country}", zip: "${zipcode}") {
      postcode, 
      places { 
        city, 
        state { name }
      }
    }
  }`;
};
