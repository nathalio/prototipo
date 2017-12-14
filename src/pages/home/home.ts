import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { EstadoAlunoPage } from '../EstadoAluno/EstadoAluno';
import { EscolhaCursoPage } from '../EscolhaCurso/EscolhaCurso';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(EscolhaCursoPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }

}
