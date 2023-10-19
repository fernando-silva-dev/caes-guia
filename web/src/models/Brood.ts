// TODO: Unificar nomes e tipos com o backend

export interface BroodDog {
  // Os IDs no backend são todos UID
  id?: number;
  name: string;
  sex: string;
  color: string;
}

export interface Brood {
  // Os IDs no backend são todos UID
  id?: number;
  description: string;
  // Mother é um dog
  motherName: string;
  // Father é um dog
  fatherName: string;
  // Birthdate eu botei no cão, por que existem cães sem ninhada
  birthDate: string;
  // Aqui eu chamei de children
  dogs: BroodDog[];
}
