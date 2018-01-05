import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EscolaPublicaPage } from '../EscolaPublica/EscolaPublica';

@Component({
  selector: 'page-CalculoRenda',
  templateUrl: 'CalculoRenda.html'
})
export class CalculoRendaPage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(EscolaPublicaPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }
}
