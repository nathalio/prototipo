import { Component } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { ListaCursosPage } from '../ListaCursos/ListaCursos';

@Component({
  selector: 'page-EscolhaCursoECidade',
  templateUrl: 'EscolhaCursoECidade.html'
})
export class EscolhaCursoECidadePage {


  constructor(public navCtrl: NavController) {

  }

  startApp(listCity, course: any) {
    this.navCtrl.push(ListaCursosPage, {
      cities: listCity, 
      courseList: course
    });
  }
}
