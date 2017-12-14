import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { SelecaoCursosPage } from '../SelecaoCursos/SelecaoCursos';

@Component({
  selector: 'page-CotasAfirmativas',
  templateUrl: 'CotasAfirmativas.html'
})
export class CotasAfirmativasPage {

  constructor(public navCtrl: NavController) {

  }
  startApp() {
    this.navCtrl.push(SelecaoCursosPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }

}
