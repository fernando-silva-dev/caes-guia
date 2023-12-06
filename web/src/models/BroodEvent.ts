export interface BroodEvent {
  id?: string;
  name: string;
  description: string;
  date: string;
}

export interface BroodEventTemplate {
  id?: string;
  recurrenceRule: string;
  description: string;
}
