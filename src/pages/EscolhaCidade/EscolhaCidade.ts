import { Component } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';
import { ListaCursosPage } from '../ListaCursos/ListaCursos';

@Component({
  selector: 'page-EscolhaCidade',
  templateUrl: 'EscolhaCidade.html'
})
export class EscolhaCidadePage {

  public course1: any;
  public course2: any;
  public course3: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {}

  ionViewWillEnter(){
    this.course1 = this.navParams.data.course1;
    this.course2 = this.navParams.data.course2;
    this.course3 =  this.navParams.data.course3;
  }

  startApp(listCity: any) {
    this.navCtrl.push(ListaCursosPage, {
      cities: [listCity[0], listCity[1], listCity[2]], 
      courseList: [this.course1, this.course2, this.course3] 
    });
  }
}
