// TODO: Unificar nomes e tipos com o backend

import { Dog } from '~/models/Dog';

export interface BroodDog {
  id?: string;
  name: string;
  sex: string;
  color: string;
}

export interface Brood {
  id?: string;
  description: string;
  mother?: Dog;
  motherId?: string;
  father?: Dog;
  fatherId?: string;
  children: BroodDog[];
}
