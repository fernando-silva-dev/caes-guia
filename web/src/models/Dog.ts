export interface Dog {
  id?: number;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  color: string;
  status: number | string;
  responsiblesIds: string[];
  responsibleId?: string;
}
