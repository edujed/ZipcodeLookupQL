/**
 * Apollo GraphQL Server main types
 * @author edujed
 */

import {gql} from 'apollo-server';

export const typeDefs = gql`
type BaseType {  
  name: String
  abbreviation: String
}

type Place { 
  city: String
  latitude: String 
  longitude: String
  state: BaseType
}

type Zipcode { 
  country: BaseType
  postcode: String
  places: [Place] 
}

type Query {
  zipcode(country: String, zip: String): Zipcode
  countries: [BaseType]
  country(abbreviation: String): BaseType
}    
`;