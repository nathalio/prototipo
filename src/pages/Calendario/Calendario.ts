import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { NotasEnemPage } from '../NotasEnem/NotasEnem';

@Component({
  selector: 'page-Calendario',
  templateUrl: 'Calendario.html'
})
export class CalendarioPage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(NotasEnemPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }
}
