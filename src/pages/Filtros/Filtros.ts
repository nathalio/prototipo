import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { ListaCursosPage } from '../ListaCursos/ListaCursos';
//import { EscolhaCidadePage } from '../EscolhaCidade/EscolhaCidade';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Component({
  selector: 'page-Filtros',
  templateUrl: 'Filtros.html'
})
export class FiltrosPage {

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
  public navParams: NavParams,
  public toastCtrl: ToastController,
  private http:Http) {
      this.initializeItems();
  }

  ionViewDidLoad(){
    this.cr1 = this.navParams.data.course;
    this.ct1 = this.navParams.data.city;
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
    if (!error) this.applyFilter(city, course);
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

  applyFilter(city, course: any) {
    this.navCtrl.push(ListaCursosPage, {
      cities: city, //[city, "", ""], 
      courseList: course // [course, "", ""],      universityList: university
    });
  }
}
