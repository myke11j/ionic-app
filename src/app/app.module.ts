import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { FillForm } from '../pages/fill-form/fill-form';
import { MainPage } from '../pages/main-page/main-page';
import { TabsPage } from '../pages/tabs/tabs';

@NgModule({
  declarations: [
    MyApp,
    FillForm,
    MainPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    FillForm,
    MainPage,
    TabsPage
  ],
  providers: []
})
export class AppModule {}
