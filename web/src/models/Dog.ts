import { User } from './User';

export interface Dog {
  id?: number;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  sex: string;
  color: string;
  status: string;
  responsibles?: User[];
  responsiblesIds: string[];
  responsibleId?: string;
}
