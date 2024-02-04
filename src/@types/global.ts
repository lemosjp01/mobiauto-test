export enum EVehicleType {
  CARS = "cars",
  MOTORCYCLES = "motorcycles",
  TRUCKS = "trucks"
}

export interface IField {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  disabled: boolean;
}

export interface IParam {
  name: string;
  code: string;
}

export interface IFipeResponse {
  price: string;
  brand: string;
  model: string;
  modelYear: number;
  fuel: string;
  codeFipe: string;
  referenceMonth: string;
  vehicleType: number;
  fuelAcronym: string;
}