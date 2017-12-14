import { Component } from '@angular/core';
import { NavController, Content, Platform } from 'ionic-angular';
import { EscolhaCidadePage } from '../EscolhaCidade/EscolhaCidade';

@Component({
  selector: 'page-Filtros',
  templateUrl: 'Filtros.html'
})
export class FiltrosPage {

  public dimensions = new class{
    height: any;
    width: any;
  };

  constructor(public navCtrl: NavController) {
  }

  toCitySelector(courses: any) {
    this.navCtrl.push(EscolhaCidadePage, {course1: courses[0], course2: courses[1], course3: courses[2] });
  }
}
