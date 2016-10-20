import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Http } from '@angular/http';
import { appLanguage } from '../globals';

declare var cordova : any;
declare var window : any;

@Component({
  selector: 'page-home',
  templateUrl: 'main-page.html',
  providers: []
})
export class MainPage {
  mainPage : any;

  constructor(public navCtrl: NavController, public platform: Platform, public http: Http) {
    this.mainPage = {};
    this.http = http;
    this.mainPage.slides = [];
    this.initializePage();

    platform.ready().then(() => {
          StatusBar.styleDefault();
          this.listDir(cordova.file.applicationDirectory + 'www/assets/imgs/');
      });
  }

  initializePage = () : void => {
    this.getTranslatedString("title"); //setting title of tab
    this.setMainPageSlideOptions();
  }

  getTranslatedString = (key: string) : void => {
    let self = this;
    this.http.get('assets/i18n/main/'+appLanguage+'.json').subscribe(function(res) {
      self.mainPage[key] = res.json().mainPage[key];
    });
  }

  listDir = (path : string) : void => {
    let self = this;
    window.resolveLocalFileSystemURL(path,
      function (fileSystem) {
        let reader = fileSystem.createReader();
        reader.readEntries(
          function (entries) {
            for(let index in entries) {
              entries[index].fullPath = entries[index].fullPath.substring(5, (entries[index].fullPath.length));
              self.mainPage.slides.push(entries[index].fullPath);
            }
          },
          function (err) {
            // handle err
          }
        );
      }, function (err) {
        // handle err
      }
    );
  }

  setMainPageSlideOptions = () : void => {
    this.mainPage.slideOptions = {
      pager: true,
      initialSlide: 1
    }
  }

}
