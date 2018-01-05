import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CalculoRendaPage } from '../CalculoRenda/CalculoRenda';

@Component({
  selector: 'page-NotasEnem',
  templateUrl: 'NotasEnem.html'
})
export class NotasEnemPage {

  constructor(public navCtrl: NavController) {

  }

  startApp() {
    this.navCtrl.push(CalculoRendaPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }
}
