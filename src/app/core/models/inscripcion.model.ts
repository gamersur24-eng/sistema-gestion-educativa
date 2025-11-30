export interface Inscripcion {
  id?: number;
  usuarioId: number;
  cursoId: number;
  fechaInscripcion: string;
}

export interface CursoInscrito {
  id: number;
  nombre: string;
  descripcion: string;
  creditos: number;
  profesor: string;
  fechaInscripcion: string;
}
