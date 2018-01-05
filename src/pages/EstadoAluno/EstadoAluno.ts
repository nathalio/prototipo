import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { EscolhaCursoPage } from '../EscolhaCurso/EscolhaCurso';

@Component({
  selector: 'page-EstadoAluno',
  templateUrl: 'EstadoAluno.html'
})
export class EstadoAlunoPage {

  constructor(public navCtrl: NavController) {

  }
  startApp() {
    this.navCtrl.push(EscolhaCursoPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }

}
