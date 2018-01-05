import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { NotasEnemPage } from '../NotasEnem/NotasEnem';
import { FiltrosPage } from '../Filtros/Filtros';

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
  public courseListflag: string; //
  public childElement2: any;
  public childElement: any;
  public citySelected: any;
  public canonicalSelected: any;
  public loader: any;

  constructor(public navCtrl: NavController,
  public navParams: NavParams,
  public loadingCtrl: LoadingController,
  private toastCtrl: ToastController
  ) { }

    ionViewDidLoad(){
        this.citiesSelected = this.navParams.data.cities;
        this.coursesSelected = this.navParams.data.courseList;
        this.createLoader();
        Promise.all([this.getCityFromName(this.citiesSelected),
          this.getCoursesFromName(this.coursesSelected)])
          .then((results2) => {
            Promise.all([this.getCourseFromCityAndCanonical(results2[0][0].id, results2[1][0].id)])
            .then((results)=>{
              //this.filterLists(); //não preciso desta rotina se vou exibir todos os resultados
              if (results.toString() == 'emptyQuery'){
                this.navCtrl.pop();
                this.showToast(); //aviso de que não achou cursos na cidade escolhida
              } else {
              this.courseList = results[0];
              this.processData();
            }
            this.loader.dismiss();
            return true;
            });
          })
    }

    //modificado para estrutura nova da base
    getCoursesFromName(courseName: any): Promise<any>{
      const courseReference: firebase.database.Reference = firebase.database().ref('canonical_courses');
      this.canonicalSelected = [];
      console.log('começo: ', this.canonicalSelected);
      let courseUpper = courseName.toUpperCase();
      return new Promise((resolve, reject) => {
        // courseName.forEach((courseType: any)=> { //as linhas comentadas são para comportar um array de cursos
        //   if (courseType) {
            courseReference.orderByChild("name").equalTo(courseUpper).once('value').then(function(snapshot) {
              let data = [];
                snapshot.forEach((childSnapshot) => {
                  data = data.concat(childSnapshot.val());
              })
              resolve(data);
              console.log('data: ',data)
          //   });
          // }
        });
      });
      // .then(function(response) {
      //   console.log('final: ', response);
      //   this.canonicalSelected = response;
      // });
    } //término do código getCoursesFromName

    getCityFromName(cityName: any): Promise<any>{
      const cityReference: firebase.database.Reference = firebase.database().ref('cities/');
      this.citySelected = [];
      return new Promise((resolve, reject) => {
        // courseName.forEach((courseType: any)=> { //as linhas comentadas são para comportar um array de cursos
        //   if (courseType) {
            cityReference.orderByChild("name").equalTo(cityName).once('value').then(function(snapshot) {
              let data = [];
              snapshot.forEach((childSnapshot) => {
                data = data.concat(childSnapshot.val());
              })
              resolve(data);
              console.log('data: ',data)
          //   });
          // }
        });
      })
    } //término do código getCoursesFromName

    getCourseFromCityAndCanonical(cityId: number, canonicalId: number): Promise<any>{
      const courseCanonicalReference: firebase.database.Reference = firebase.database().ref('courses_by_cities/');
      return new Promise((resolve, reject) => {
      // cityName.forEach((cityType: any)=> {
      //   if (cityType) {
        courseCanonicalReference.orderByChild("canonical_course_id").equalTo(canonicalId).once('value')
        .then(function(snapshot) {
          let dataset = [];
          snapshot.forEach((childSnapshot) => { //apesar do forEach, sempre se espera um elemento aqui
            dataset = childSnapshot.key;
            console.log('chave do canonical course: ',childSnapshot.key);
          });
          if (dataset) {
            const courseCityReference: firebase.database.Reference = firebase.database().ref('courses_by_cities/'.concat(dataset.toString()).concat('/cities/'));
            courseCityReference.orderByChild("city_id").equalTo(cityId).once('value')
            .then(function(snapshot) {
              let data = [];
              snapshot.forEach((childSnapshot) => {
                data = data.concat(childSnapshot.val());
              })
              if (data == [])
                resolve('emptyQuery')
              else resolve(data[0].courses)
            });
          }
        })

      })
    } //término de getCoursesFromCity


    //este método por enquanto está deprecado
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
      this.courseList = this.campusList; //se der certo esta linha, remover todo o código acima de filterLists
      console.log('lista final: ',this.courseList);
    }




    processData(): void {

      // cria constantes para as "tabelas-raiz" da base
      const courseReference = this.createReference('courses/');

      // pega a lista de cursos
      this.courseList.forEach((courseNumber) =>{
        // captura o nome e a cidade do campus relacionado ao curso
        courseReference.orderByChild("id").equalTo(+courseNumber).once("value", snapshot => {
            let dataset = snapshot.val();
            // a rotina abaixo itera em todos os filhos de um DataSnapshot, porém do jeito que foi
            // construído o banco de dados, cada campus tem um id único, e cada cidade também tem
            // um id único.
            snapshot.forEach(function(childSnapshot) {
              dataset = childSnapshot.val();
              return true;
            });
            let course = dataset;
            course.name = dataset.name;
            course.city_id = dataset.city;
            course.campus_name = dataset.campus_name;
            course.city_state = dataset.city + ' - ' + dataset.state;
            course.university_name = dataset.university_name;
            course.icon = dataset.icon;
            //adequar eventuais registros vindos do QB com períodos em inglês
            course.period = this.translatePeriod(dataset.period);
            if (!dataset.grades) course.grades = "---"
              else course.grades = dataset.grades.default;
            //adequar eventuais cursos sem ranking;
            if (!dataset.rating) course.rating = 0
              else course.rating = dataset.rating;
            this.courses.push(course);
            return dataset;
          });
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

    // para criar a tela de carregar cursos nativa do iOS e Android
  createLoader(){
    let load = this.loadingCtrl.create({
      content: "Carregando cursos...",
      duration: 10000
    });
    this.loader = load;
    this.loader.present();
  }

  showFilters() {
    this.navCtrl.push(FiltrosPage, {
      city: this.navParams.data.cities,
      course: this.navParams.data.courseList
    });
  }

  showToast() {
    let toast = this.toastCtrl.create({
      message: 'Não há o curso escolhido na cidade selecionada',
      duration: 3000,
      position: 'middle'
    });
    toast.present();
    console.log('Erro de curso');
  }

  startApp() {
    this.navCtrl.push(NotasEnemPage);
  }


}
