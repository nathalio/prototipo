import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ListaCursosPage } from '../ListaCursos/ListaCursos';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-EscolhaCursoECidade',
  templateUrl: 'EscolhaCursoECidade.html'
})

export class EscolhaCursoECidadePage {

  showCityList: boolean = false;
  showCourseList: boolean = false;
  searchQuery: string = '';
  cityItems: string[];
  courseItems: string[];
  cityItemsFiltered: string[];
  courseItemsFiltered: string[];
  public ct1 = "";
  public cr1 = "";
  public response: any;

  constructor(public navCtrl: NavController,
  private toastCtrl: ToastController,
  private http:Http ) {
    this.initializeItems();
    //this.initializeCourseItems();
  }

  checkEntries(city, course) {
    let error = false;
    if (this.courseItems.find(x => x == course) == undefined) {
      this.displayCourseError();
      error = true;
    }
    if (this.cityItems.find(x => x == city) == undefined) {
      this.displayCityError();
      error = true;
    }
    if (!error) this.startApp(city, course);
  }

  startApp(listCity, course: any) { //traz a página de cursos com os parâmetros
    console.log('clicou no botao');
    this.navCtrl.push(ListaCursosPage, {
      cities: listCity, 
      courseList: course
      // a página ListaCursosPage também recebe um parâmetro universityList
      // mas aqui ele não será especificado
    });
  }

  replaceCityItem(it: any) {
    this.ct1 = it;
    this.showCityList = false;
  }

  replaceCourseItem(it: any) {
    this.cr1 = it;
    this.showCourseList = false;
  }

  getCityItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if ((val && val.trim() != '') && val.length > 2) {

      // Filter the items
      this.cityItemsFiltered = this.cityItems.filter((item) => {
        console.log('procurou filtros de cidade')
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      // Show the results
      this.showCityList = true;
    } else {

      // hide the results when the query is empty
      this.showCityList = false;
    }
  }

  getCourseItems(ev: any) {
    // Reset items back to all of the items
    //this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if ((val && val.trim() != '') && val.length > 2) {

      // Filter the items
      this.courseItemsFiltered = this.courseItems.filter((item) => {
        console.log('procurou filtros de curso')
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      });

      // Show the results
      this.showCourseList = true;
    } else {

      // hide the results when the query is empty
      this.showCourseList = false;
    }
  }

  displayCityError(){
    let toast = this.toastCtrl.create({
      message: 'Digite uma cidade válida',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    console.log('Erro de cidade');
  }

  displayCourseError() {
    let toast = this.toastCtrl.create({
      message: 'Digite um curso válido',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    console.log('Erro de curso');
  }

  initializeItems() {
    console.log('tentou ler arquivo')
    this.http.get("assets/data/base_data.json")
    .map(res => res.json())
    .subscribe(data => {
      this.response = data;
      this.cityItems = [];
      this.courseItems = [];
      this.response.cities.forEach((city) => {
        this.cityItems.push(city.name);
      });
      this.response.canonical_courses.forEach((course) => {
        this.courseItems.push(course.name);
      });
    })

  }



}
