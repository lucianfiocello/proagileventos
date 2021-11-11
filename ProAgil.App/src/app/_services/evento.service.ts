import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../_models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  baseUrl = 'http://localhost:5000/api/eventos';
  constructor(private http: HttpClient) { }

  getTodosEventos(): Observable<Evento[]>{
    return this.http.get<Evento[]>(this.baseUrl);
  }

  getEventosPorTema(tema: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseUrl}/obterPorTema/${tema}`);
  }

  getEventoPorId(id: number): Observable<Evento>{
    return this.http.get<Evento>(`${this.baseUrl}/${id}`);
  }

  postUpload(file: File[]){
    const fileToUpload = <File>file[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return this.http.post(`${this.baseUrl}/upload`, formData);
  }

  postEvento(evento: Evento){
    return this.http.post(this.baseUrl, evento);
  }

  putEvento(evento: Evento){
    return this.http.put(`${this.baseUrl}/${evento.id}`, evento);
  }

  deleteEvento(id: number){
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
