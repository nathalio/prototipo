import { Component, ViewChild } from '@angular/core';
import { NavController, Content, NavParams } from 'ionic-angular';

import { NotasEnemPage } from '../NotasEnem/NotasEnem';
import { FiltrosPage } from '../Filtros/Filtros';

import { CoursesData } from '../../providers/courses_data';

import firebase from 'firebase';

@Component({
  selector: 'page-ListaCursos',
  templateUrl: 'ListaCursos.html'
})
export class ListaCursosPage {

  public citiesSelected = [];
  public coursesSelected = [];
  public courses = [];
  public campusList = [];
  public courseList = [];
  public childElement2 = [];
  public childElement = [];
  public citySelected: number;
  public canonicalSelected: number;

  constructor(public navCtrl: NavController,
  public navParams: NavParams
  ) { }

    ionViewDidLoad(){
        this.citiesSelected = this.navParams.data.cities;
        this.coursesSelected = this.navParams.data.courseList;
        Promise.all([this.getCityFromName(this.citiesSelected),
          this.getCoursesFromName(this.coursesSelected)])
          .then((results2) =>{
            this.getCourseFromCityAndCanonical(this.citySelected[0].id, this.canonicalSelected[0].id)
          })
          .then((results)=>{
            this.filterLists();
            this.processData(10);
            return true;
          });
    }

    //modificado para estrutura nova da base
    getCoursesFromName(courseName: string): Promise<any>{
      const courseReference: firebase.database.Reference = firebase.database().ref('canonical_courses');
      let courseUpper = courseName.toUpperCase();
      return new Promise((resolve, reject) => {
        // courseName.forEach((courseType: any)=> { //as linhas comentadas são para comportar um array de cursos
        //   if (courseType) {
            courseReference.orderByChild("name").equalTo(courseUpper).once('value', snapshot => { //courseType
              this.canonicalSelected = [];
              snapshot.forEach((childSnapshot) => {
                this.canonicalSelected = this.canonicalSelected.concat(childSnapshot.val());
              })
              resolve(true);
          //   });
          // }
        });
      })
    } //término do código getCoursesFromName

    getCityFromName(cityName: string): Promise<any>{
      const cityReference: firebase.database.Reference = firebase.database().ref('cities/');
      return new Promise((resolve, reject) => {
        // courseName.forEach((courseType: any)=> { //as linhas comentadas são para comportar um array de cursos
        //   if (courseType) {
            cityReference.orderByChild("name").equalTo(cityName).once('value', snapshot => { //courseType
              this.citySelected = [];
              snapshot.forEach((childSnapshot) => {
                this.citySelected = this.citySelected.concat(childSnapshot.val());
              })
              resolve(true);
          //   });
          // }
        });
      })
    } //término do código getCoursesFromName

      //código em versão antiga, antes de reestruturar a base
    getCoursesFromCity(cityName: string): Promise{
      const cityReference: firebase.database.Reference = firebase.database().ref('cities');
      const campusReference: firebase.database.Reference = firebase.database().ref('campi');
      return new Promise((resolve, reject) => {
      // cityName.forEach((cityType: any)=> {
      //   if (cityType) {
        cityReference.orderByChild("name").equalTo(cityName).once('value', snapshot => { //cityType
          snapshot.forEach((childSnapshot) => {
            this.childElement = childSnapshot.val();
          })
            console.log(this);
        })
        .then((dataset)=>{
          if (this.childElement.id) {
            campusReference.orderByChild("city_id").equalTo(this.childElement.id).once('value', snapshot => {
              this.childElement2 = [];
              snapshot.forEach((childSnapshot) => {
                this.childElement2 = this.childElement2.concat(childSnapshot.val());
              })
              this.campusList = this.campusList.concat(this.childElement2);
              resolve(true);
            });
          }
        })
      })
    } //término de getCoursesFromCity

    getCourseFromCityAndCanonical(cityId: number, canonicalId: number): Promise{
      const courseCityReference: firebase.database.Reference = firebase.database().ref('courses_by_cities/'.concat(canonicalId));
      return new Promise((resolve, reject) => {
      // cityName.forEach((cityType: any)=> {
      //   if (cityType) {
        courseCityReference.orderByChild("cities/").equalTo(cityId).once('value', snapshot => { //cityType
          snapshot.forEach((childSnapshot) => {
            this.childElement = childSnapshot.val();
          })
            console.log(this);
        })
        .then((dataset)=>{
          if (this.childElement.city_id) {
            campusReference.orderByChild("city_id").equalTo(this.childElement.id).once('value', snapshot => {
              this.childElement2 = [];
              snapshot.forEach((childSnapshot) => {
                this.childElement2 = this.childElement2.concat(childSnapshot.val());
              })
              this.campusList = this.campusList.concat(this.childElement2);
              resolve(true);
            });
          }
        })
      })
    } //término de getCoursesFromCity



    filterLists(): void{
      let list1 = this.campusList;
      let list2 = this.courseList;
      let finalList = new Array();
      list1.forEach((campus) =>{
        list2.forEach((course) => {
          if (campus.id == course.campus_id)
            finalList.push(course);
          })
        });
      this.courses = finalList;
      console.log('lista final: ',finalList);
    }




    processData(limit: number): void {

      // cria constantes para as "tabelas-raiz" da base
      const campusReference = this.createReference('campi/');
      const universityReference = this.createReference('universities/');
      const cityReference = this.createReference('cities/');

      // pega a lista de cursos
      let index = 0;
      this.courses.every((course: any, index) =>{
        course.name = this.toCapitalize(course.name);
        console.log(course);

        // captura o nome e a cidade do campus relacionado ao curso
        campusReference.orderByChild("id").equalTo(+course.campus_id).once("value", snapshot => {
            let dataset = snapshot.val();

            // a rotina abaixo itera em todos os filhos de um DataSnapshot, porém do jeito que foi
            // construído o banco de dados, cada campus tem um id único, e cada cidade também tem
            // um id único.
            snapshot.forEach(function(childSnapshot) {
              dataset = childSnapshot.val();
              return true;
            });
            course.city_id = dataset.city;
            course.campus_name = dataset.name;

            // como a cidade está dentro de um registro de campus, esta rotina de encontrar a cidade está
            // dentro da rotina de campus
            cityReference.orderByChild("id").equalTo(+course.city_id).once("value", snapshot => {
                let dataset = snapshot.val();
                snapshot.forEach(function(childSnapshot) {
                  dataset = childSnapshot.val();
                  return true;
                });
                course.city_state = dataset.name + ' - ' + dataset.state;

                return dataset;
              });

              return dataset;
            });

        // captura a universidade relacionada ao curso.
        universityReference.orderByChild("id").equalTo(course.university_id)
          .once("value", snapshot => {
            let dataset = snapshot.val();
            snapshot.forEach(function(childSnapshot) {
              dataset = childSnapshot.val();
              return true;
            });
            console.log(dataset);
            course.university_name = dataset.name;

            return dataset;
          });

        //adequar eventuais registros vindos do QB com períodos em inglês
        course.period = this.translatePeriod(course.period);

        //adequar eventuais cursos sem ranking;
        if (!course.rating) course.rating = 0;
        index++
        console.log('indice: ',index);
        if (index == limit) return false;
        else return true;
      })

    }

    createReference(root: string): firebase.database.Reference {
      return firebase.database().ref(root);
    }

    translatePeriod(period: string): string{
      switch (period){
        case 'morning': { return 'Manhã'; }
        case 'night':{ return 'Noite'; }
        case 'full':{ return 'Integral'; }
        case 'other':{ return 'Virtual'; }
        case 'Matutino': { return 'Manhã'; }
        case 'Noturno':{ return 'Noite'; }
        case 'Integral':{ return 'Integral'; }
        case 'Vespertino':{ return 'Tarde'; }
        default:{ return ''; }
      }
    }

    toCapitalize(wordConvert: string): string{
      return wordConvert.charAt(0).toUpperCase() + wordConvert.slice(1).toLowerCase();
    }


  showFilters() {
    this.navCtrl.push(FiltrosPage)
  }

  startApp() {
    this.navCtrl.push(NotasEnemPage)
    // .then(() => {
    //   this.storage.set('hasSeenTutorial', 'true');
    // })
  }


}
