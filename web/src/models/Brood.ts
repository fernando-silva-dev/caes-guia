import { Dog } from '~/models/Dog';

export interface BroodDog {
  id?: string;
  name: string;
  sex: string;
  coat: number;
  coatInput: string;
  birthDate?: string;
  status?: string;
}

export interface Brood {
  id?: string;
  description: string;
  birthDate?: string;
  mother?: Dog;
  motherId?: string;
  father?: Dog;
  fatherId?: string;
  children: BroodDog[];
}
