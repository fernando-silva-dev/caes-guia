export interface BroodDog {
  id?: number;
  name: string;
  sex: string;
  color: string;
}

export interface Brood {
  id?: number;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string ;
  dogs: BroodDog[];
}
