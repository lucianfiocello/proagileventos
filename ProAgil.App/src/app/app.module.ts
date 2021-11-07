import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgModule } from '@angular/core';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { EventoService } from './_services/evento.service';

import { AppComponent } from './app.component';
import { EventosComponent } from './eventos/eventos.component';
import { NavComponent } from './nav/nav.component';

import { DateTimeFormatPipe } from './_helps/date-time-format-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DateTimeFormatPipe,
    EventosComponent,
    NavComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BsDropdownModule.forRoot(),
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot()
  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
