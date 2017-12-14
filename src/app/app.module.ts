import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { EstadoAlunoPage } from '../pages/EstadoAluno/EstadoAluno';
import { EscolhaCursoPage } from '../pages/EscolhaCurso/EscolhaCurso';
import { EscolhaCidadePage } from '../pages/EscolhaCidade/EscolhaCidade';

import { ListaCursosPage } from '../pages/ListaCursos/ListaCursos';
import { FiltrosPage } from '../pages/Filtros/Filtros';
import { NotasEnemPage } from '../pages/NotasEnem/NotasEnem';
import { CalculoRendaPage } from '../pages/CalculoRenda/CalculoRenda';
import { EscolaPublicaPage } from '../pages/EscolaPublica/EscolaPublica';
import { CotasAfirmativasPage } from '../pages/CotasAfirmativas/CotasAfirmativas';
import { SelecaoCursosPage } from '../pages/SelecaoCursos/SelecaoCursos';
import { CalendarioPage } from '../pages/Calendario/Calendario';


import { CoursesData } from '../providers/courses_data';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EstadoAlunoPage,
    EscolhaCursoPage,
    EscolhaCidadePage,
    ListaCursosPage,
    NotasEnemPage,
    CalculoRendaPage,
    EscolaPublicaPage,
    CotasAfirmativasPage,
  SelecaoCursosPage,
  CalendarioPage,
  FiltrosPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'Voltar'
    })

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EstadoAlunoPage,
    EscolhaCursoPage,
    EscolhaCidadePage,
    ListaCursosPage,
    NotasEnemPage,
    CalculoRendaPage,
    EscolaPublicaPage,
    CotasAfirmativasPage,
    SelecaoCursosPage,
    CalendarioPage,
    FiltrosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CoursesData,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
