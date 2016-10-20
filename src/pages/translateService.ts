import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { appLanguage } from './globals';

@Injectable()
export class TranslateService {

  language : any;
  constructor(private http: Http) {
    this.http = http;
    if(typeof this.language === 'undefined') {
      this.language = {};
    }
  }

  setLanguage = () : void => {
    let self = this;
    this.http.get('assets/i18n/form/'+appLanguage+'.json').subscribe(function(res) {
      self.language.form = res.json().fillForm;
    });

    this.http.get('assets/i18n/main/'+appLanguage+'.json').subscribe(function(res) {
      self.language.main = res.json().mainPage;
    });
  }

  getFormLanguage = () : any => {
    return this.language.form;
  }

  getMainLanguage = () : any => {
    return this.language.main;
  }
}
