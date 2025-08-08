import { Area } from "./area.model";

export interface Profissional {
  id: number;
  nome: string;
  telefone: string;
  email: string;
  ativo: boolean;
  areas: Area[];
}