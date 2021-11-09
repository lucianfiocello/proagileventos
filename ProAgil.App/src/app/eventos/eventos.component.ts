import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../_models/evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { templateJitUrl } from '@angular/compiler';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  evento!: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;

  constructor(
    private eventoService: EventoService
    ,private modalService: BsModalService
    ,private fb: FormBuilder
    ,private localeService: BsLocaleService
    ) {
      this.localeService.use('pt-br')
    }

    _filtroLista!: string;
    get filtroLista(): string{
      return this._filtroLista;
    }
    set filtroLista(value: string){
      this._filtroLista = value;
      this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
    }

    openModal(template: any){
      this.registerForm.reset();
      template.show();
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
        this.registerForm = this.fb.group({
          tema: ['',[ Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          local: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
          dataEvento: ['', Validators.required],
          imagemUrl: ['', Validators.required],
          qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
          telefone: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]]
        })
      }

      salvarAlteracoes(template: any) {
        if(this.registerForm.valid){
          this.evento = Object.assign({}, this.registerForm.value);
          this.eventoService.postEvento(this.evento).subscribe(
            (novoEvento: any) => {
              console.log(novoEvento);
              template.hide();
              this.getEventos();
            }, error => {
              console.log(error);
            }
          );
        }
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
