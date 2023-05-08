export interface Dog {
  id?: number;
  name: string;
  motherName: string;
  fatherName: string;
  birthDate: string;
  color: string;
  status: number | string;
  // TODO corrigir esse tipo, eu fiz na pressa
  responsibles: { id: string }[];
  responsiblesIds: string[];
  responsibleId?: string;
}
