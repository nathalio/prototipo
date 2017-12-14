import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { EscolhaCidadePage } from '../EscolhaCidade/EscolhaCidade';

@Component({
  selector: 'page-EscolhaCurso',
  templateUrl: 'EscolhaCurso.html'
})
export class EscolhaCursoPage {


  constructor(public navCtrl: NavController) {

  }

  toCitySelector(courses: any) {
    this.navCtrl.push(EscolhaCidadePage, {
      course1: courses[0],
      course2: courses[1],
      course3: courses[2]
    });
  }
}
