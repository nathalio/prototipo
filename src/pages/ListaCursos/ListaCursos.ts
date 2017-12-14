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

  constructor(public navCtrl: NavController,
  public navParams: NavParams
  ) { }

    ionViewDidLoad(){
        console.log (this.courses);
        console.log ('courses nulo dentro de ionViewDidLoad');
        this.getCourses();
        this.citiesSelected = this.navParams.data.cities;
        this.coursesSelected = this.navParams.data.courseList;
    }

    getCourses(): void{
      const courseReference: firebase.database.Reference = firebase.database().ref('courses');
        courseReference.once('value', snapshot => {
          let dataset = snapshot.val();
          this.courses = dataset;
          //this.processData();
        });

        // this.courses = [{
        //   "id": 1,
        //   "name": "teste bronco",
        //   "period": "morning",
        //   "rating": "4",
        //   "university_id": 1,
        //   "campus_id": 1,
        //   "grades": {
        //     "default": "860",
        //     "race": "850",
        //     "handicapped": "840",
        //     "poor": "855"
        //   }
        // }];

      }

    processData(): void {

      // cria constantes para as "tabelas-raiz" da base
      const campusReference = this.createReference('campi/');
      const universityReference = this.createReference('universities/');
      const cityReference = this.createReference('cities/');

      // pega a lista de cursos
      this.courses.forEach((course: any) =>{
        console.log('variável course');
        console.log(course);

        // captura o nome e a cidade do campus relacionado ao curso
        campusReference.orderByChild("id").equalTo(+course.campus_id).once("value", snapshot => {
            let dataset = snapshot.val();
            console.log('campus: ',snapshot.val());

            // a rotina abaixo itera em todos os filhos de um DataSnapshot, porém do jeito que foi
            // construído o banco de dados, cada campus tem um id único, e cada cidade também tem
            // um id único.
            snapshot.forEach(function(childSnapshot) {
              console.log('child key: ',childSnapshot.key);
              console.log('child value: ',childSnapshot.val());
              dataset = childSnapshot.val();
              return true;
            });
            console.log('city_id: ', dataset.city);
            console.log('nome campus: ', dataset.name);
            course.city_id = dataset.city;
            course.campus_name = dataset.name

            // como a cidade está dentro de um registro de campus, esta rotina de encontrar a cidade está
            // dentro da rotina de campus
            cityReference.orderByChild("id").equalTo(+course.city_id).once("value", snapshot => {
                let dataset = snapshot.val();
                console.log('procurando cidade');
                snapshot.forEach(function(childSnapshot) {
                  console.log('child key: ',childSnapshot.key);
                  console.log('child value: ',childSnapshot.val());
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
            console.log('procurando universidade');
            snapshot.forEach(function(childSnapshot) {
              console.log('child key: ',childSnapshot.key);
              console.log('child value: ',childSnapshot.val());
              dataset = childSnapshot.val();
              return true;
            });
            console.log(dataset);
            course.university_name = dataset.name;

            return dataset;
          });

        course.period = this.translatePeriod(course.period);

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
