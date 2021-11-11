import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Evento } from '../_models/evento';
import { BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { ToastrService } from 'ngx-toastr';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  titulo = 'Eventos';
  eventosFiltrados: Evento[] = [];
  eventos: Evento[] = [];
  evento!: Evento;
  imagemLargura = 50;
  imagemMargem = 2;
  mostrarImagem = false;
  registerForm!: FormGroup;
  dataEvento!: string;
  modoSalvar = 'post';
  bodyDeletarEvento = '';

  constructor(
    private eventoService: EventoService
    ,private modalService: BsModalService
    ,private fb: FormBuilder
    ,private localeService: BsLocaleService
    ,private toastr: ToastrService
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

    editarEvento(evento: Evento, template: any){
      this.modoSalvar = 'put';
      this.openModal(template);
      this.evento = evento;
      this.registerForm.patchValue(evento);
    }

    novoEvento(template: any){
      this.modoSalvar = 'post';
      this.openModal(template);
    }

    excluirEvento(evento: Evento, confirm: any) {
      this.openModal(confirm);
      this.evento = evento;
      this.bodyDeletarEvento = `Tem certeza que deseja excluir o Evento: ${evento.tema}, Código: ${evento.id}`;
    }

    confirmeDelete(confirm: any) {
      this.eventoService.deleteEvento(this.evento.id).subscribe(
        () => {
          confirm.hide();
            this.getEventos();
            this.toastr.success('Deletado com sucesso!');
          }, error => {
            this.toastr.error('Erro ao tentar deletar!');
            console.log(error);
          }
      );
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
          if(this.modoSalvar === 'post') {
            this.evento = Object.assign({}, this.registerForm.value);
            this.eventoService.postEvento(this.evento).subscribe(
              (novoEvento: any) => {
                console.log(novoEvento);
                template.hide();
                this.getEventos();
                this.toastr.success('Inserido com sucesso!');
              }, error => {
                this.toastr.error(`Erro ao tentar inserir: ${error}`);
              }
            );
          } else {
            this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
            this.eventoService.putEvento(this.evento).subscribe(
              () => {
                template.hide();
                this.getEventos();
                this.toastr.success('Atualizado com sucesso!');
              }, error => {
                this.toastr.error(`Erro ao tentar atualizar: ${error}`);
              }
            );
          }
        }
      }

      getEventos() {
        this.eventoService.getTodosEventos().subscribe(
          (_eventos: Evento[]) => {
            this.eventos = _eventos;
            this.eventosFiltrados = this.eventos;
          },
          error => {
            this.toastr.error(`Erro ao tentar carregar eventos: ${error}`);
          });
        }
      }
