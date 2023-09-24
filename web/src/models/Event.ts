import { Dog } from './Dog';

export interface Event {
  id?: string;
  description: string;
  date: string;
  dogId?: string;
  dog?: Dog;
  base64File?: string;
  attachmentFiles?: File[];
}
