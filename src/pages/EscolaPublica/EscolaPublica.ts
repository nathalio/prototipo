import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { CotasAfirmativasPage } from '../CotasAfirmativas/CotasAfirmativas';

@Component({
  selector: 'page-EscolaPublica',
  templateUrl: 'EscolaPublica.html'
})
export class EscolaPublicaPage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(CotasAfirmativasPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }
}
