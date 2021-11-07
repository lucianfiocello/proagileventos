import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../_models/evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  modalRef: BsModalRef = new BsModalRef;
  registerForm!: FormGroup;

  constructor(
    private eventoService: EventoService
   ,private modalService: BsModalService) { }

  _filtroLista!: string;
  get filtroLista(): string{
    return this._filtroLista;
  }
  set filtroLista(value: string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit(): void {
    this.getEventos();
    this.validation();
  }

  filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: Evento) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  alternarImagem(){
    this.mostrarImagem = !this.mostrarImagem;
  }

  validation() {
    this.registerForm = new FormGroup({
      tema: new FormControl('',
        [ Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      local: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      dataEvento: new FormControl('', Validators.required),
      imagemUrl: new FormControl('', Validators.required),
      qtdPessoas: new FormControl('', [Validators.required, Validators.max(120000)]),
      telefone: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    })
  }

  salvarAlteracoes() {

  }

  getEventos() {
    this.eventoService.getTodosEventos().subscribe(
      (_eventos: Evento[]) => {
        this.eventos = _eventos;
        this.eventosFiltrados = this.eventos;
        console.log(_eventos);
      },
      error => { console.log(error)}
    );
  }
}
