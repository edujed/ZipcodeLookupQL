/**
 * A simple ancestor type with name / abbreviation.
 * @author edujed
 */

export interface IBaseType {
  name: string;
  abbreviation: string;
}

export class BaseType implements IBaseType {
  name: string;
  abbreviation: string;

  constructor(name: string, abbreviation: string) {
    this.name = name;
    this.abbreviation = abbreviation;
  }

  static fromObject({name, abbreviation}: IBaseType) {
    return new this(name, abbreviation);
  }
}