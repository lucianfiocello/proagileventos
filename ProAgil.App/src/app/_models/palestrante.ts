import { Evento } from "./evento";
import { RedeSocial } from "./rede-social";

export interface Palestrante {
  id: number;
  nome: string;
  miniCurriculo: string;
  imagemUrl: string;
  telefone: string;
  email: string;
  redesSociais: RedeSocial[];
  palestrantesEventos: Evento[];
}
