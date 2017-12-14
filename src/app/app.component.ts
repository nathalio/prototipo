import { Component } from '@angular/core';
import { Platform, Navbar } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

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

import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  //Página inicial -> modificar para HomePage quando o app estiver pronto
  rootPage:any = HomePage; //ListaCursosPage; //FiltrosPage; //ListaCursosPage; //EscolaPublicaPage; //CalendarioPage; //SelecaoCursosPage; //CotasAfirmativasPage; //NotasEnemPage; //EstadoAlunoPage; //HomePage; //EscolhaCursoPage; //

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    firebase.initializeApp({
      apiKey: "AIzaSyAdBFPJLpsmfMJCcbIqpn8XFPaBTpijn5s",
      authDomain: "prototipo-33561.firebaseapp.com",
      databaseURL: "https://prototipo-33561.firebaseio.com",
      projectId: "prototipo-33561",
      storageBucket: "prototipo-33561.appspot.com",
      messagingSenderId: "141619561515"
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}
