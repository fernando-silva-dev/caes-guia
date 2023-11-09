import { Dog } from './Dog';

export interface Attachment {
  id?: string;
  name: string;
}

export interface Event {
  id?: string;
  description: string;
  date: string;
  dogId?: string;
  dog?: Dog;
  base64File?: string;
  attachmentFiles?: File[];
  attachments: Attachment[];
}
