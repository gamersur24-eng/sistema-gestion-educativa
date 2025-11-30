import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map } from 'rxjs';
import { Inscripcion, CursoInscrito } from '../models/inscripcion.model';
import { Curso } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private apiUrl = 'http://localhost:3000/inscripciones';
  private cursosUrl = 'http://localhost:3000/cursos';

  constructor(private http: HttpClient) {}

  getInscripciones(): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(this.apiUrl);
  }

  getInscripcionesByUsuario(usuarioId: number): Observable<Inscripcion[]> {
    return this.http.get<Inscripcion[]>(`${this.apiUrl}?usuarioId=${usuarioId}`);
  }

  getCursosInscritos(usuarioId: number): Observable<CursoInscrito[]> {
    return this.getInscripcionesByUsuario(usuarioId).pipe(
      map(inscripciones => {
        const cursosObservables = inscripciones.map(inscripcion =>
          this.http.get<Curso>(`${this.cursosUrl}/${inscripcion.cursoId}`).pipe(
            map(curso => ({
              ...curso,
              fechaInscripcion: inscripcion.fechaInscripcion
            } as CursoInscrito))
          )
        );
        return forkJoin(cursosObservables);
      }),
      map(observable => observable as Observable<CursoInscrito[]>),
      map(observable => {
        let result: CursoInscrito[] = [];
        observable.subscribe(cursos => result = cursos);
        return result;
      })
    );
  }

  inscribirse(usuarioId: number, cursoId: number): Observable<Inscripcion> {
    const inscripcion: Inscripcion = {
      usuarioId,
      cursoId,
      fechaInscripcion: new Date().toISOString().split('T')[0]
    };
    return this.http.post<Inscripcion>(this.apiUrl, inscripcion);
  }

  desinscribirse(inscripcionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${inscripcionId}`);
  }

  estaInscrito(usuarioId: number, cursoId: number): Observable<boolean> {
    return this.http.get<Inscripcion[]>(
      `${this.apiUrl}?usuarioId=${usuarioId}&cursoId=${cursoId}`
    ).pipe(
      map(inscripciones => inscripciones.length > 0)
    );
  }
}
