// services/instituto.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Institucion, Direccion, InstitucionCreate, InstitucionUpdate } from '../interfaces/institucion';

@Injectable({
  providedIn: 'root'
})
export class InstitutoService {
  private apiUrl = 'https://psycare-connect-backend-production.up.railway.app/psycare/api/institutos';

  constructor(private http: HttpClient) { }

  getInstitutos(): Observable<Institucion[]> {
    return this.http.get<Institucion[]>(this.apiUrl);
  }

  getInstituto(id: number): Observable<Institucion> {
    return this.http.get<Institucion>(`${this.apiUrl}/${id}`);
  }

  createInstituto(instituto: InstitucionCreate): Observable<Institucion> {
    return this.http.post<Institucion>(this.apiUrl, instituto);
  }

  updateInstituto(id: number, instituto: InstitucionUpdate): Observable<Institucion> {
    return this.http.put<Institucion>(`${this.apiUrl}/${id}`, instituto);
  }

  deleteInstituto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
