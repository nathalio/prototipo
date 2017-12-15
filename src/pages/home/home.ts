import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

//import { EstadoAlunoPage } from '../EstadoAluno/EstadoAluno';
import { EscolhaCursoECidadePage } from '../EscolhaCursoECidade/EscolhaCursoECidade';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(EscolhaCursoECidadePage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }

}
