import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { CalendarioPage } from '../Calendario/Calendario';

@Component({
  selector: 'page-SelecaoCursos',
  templateUrl: 'SelecaoCursos.html'
})
export class SelecaoCursosPage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(CalendarioPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }
}
