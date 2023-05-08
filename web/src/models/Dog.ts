import { Tutor } from './Tutor';

export interface Dog {
  id?: number;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  color: string;
  status: string;
  responsibles?: Tutor[];
  responsiblesIds: string[];
  responsibleId?: string;
}
