import { User } from './User';

export interface Dog {
  id?: string;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  sex: string;
  coat: string;
  status: string;
  responsibles?: User[];
  responsiblesIds: string[];
  responsibleId?: string;
}
