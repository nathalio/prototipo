import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class CoursesData {

  public data: any;

  constructor(public http: Http) {  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking speakers to sessions

    this.data = data.json();

    this.data.courses.forEach((course: any) =>{
      let university = this.data.universities.find((u: any) => u.id === course.university_id );
      course.university_name = university.name;
      let campus = this.data.campi.find((cp: any) => cp.id === course.campus_id );
      course.campus_name = campus.name;
      course.city_state = campus.city; //armazena somente o id da cidade, mais tarde armazenará "cidade - UF"
      let cityAndState = this.data.cities.find((ct: any) => ct.id === course.city_state);
      course.city_state = cityAndState.name + " - " + cityAndState.state;
      switch (course.period){
        case 'morning':{
          course.period = 'Manhã';
          break;
        }
        case 'night':{
          course.period = 'Noite';
          break;
        }
        case 'full':{
          course.period = 'Integral';
          break;
        }
        case 'other':{
          course.period = 'Virtual';
          break;
        }
        default:{
          course.period = '';
          break;
        }
      }

    })

    return this.data;
  }

  // getCourses(): Observable<any> {
  //
  //   //o que funciona local
  //   //return this.http.get('assets/data/data.json');
  // }

  // getRatings() {
  //   return this.load().map((data: any) => {
  //     return data.ratings;
  //   });
  // }
  //
  // getCities() {
  //   return this.load().map((data: any) => {
  //     return data.cities;
  //   });
  // }
  //
  // getUniversities(){
  //   return this.load().map((data: any) => {
  //     return data.universities;
  //   });
  // }
  //
  // getCampi(){
  //   return this.load().map((data: any) => {
  //     return data.campi;
  //   });
  // }

}
