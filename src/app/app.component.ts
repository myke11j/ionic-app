import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { TranslateService } from '../pages/translateService';

import { TabsPage } from '../pages/tabs/tabs';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`,
  providers: [TranslateService]
})
export class MyApp {
  rootPage = TabsPage;

  constructor(platform: Platform, private translateService: TranslateService) {
    translateService.setLanguage();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
}
