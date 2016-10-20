import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { TranslateService } from '../translateService';

@Component({
  selector: 'page-about',
  templateUrl: 'fill-form.html'
})
export class FillForm {
  fillForm : any;

  constructor(private navCtrl: NavController, private toastCtrl: ToastController, private translateService : TranslateService) {
    this.fillForm = {};
    this.fillForm.imageArr = []; //will be used to save images
    this.fillForm.language = translateService.getFormLanguage();
    this.initializePage();
  }

  initializePage = () : void => {
    this.createFieldObjects();
    this.setDefaultFormValues();
    this.fillForm.title = this.getTranslatedString("title"); //setting title of tab
    this.setFormFieldNames();
  }

  createFieldObjects = () : void => {
    this.fillForm.input1 = {};
    this.fillForm.input2 = {};
    this.fillForm.input3 = {};
    this.fillForm.input4 = {};
    this.fillForm.input5 = {};
    this.fillForm.input6 = {};
    this.fillForm.input7 = {};
    this.fillForm.input8 = {};
    this.fillForm.input9 ={};
    this.fillForm.input10 = {};
    this.fillForm.input11 = {};
    this.fillForm.input12 = {};
  }

  setDefaultFormValues = () : void => {
    // this.fillForm.input2.value = '';
    this.fillForm.input3.value = '';
    this.fillForm.input4.value = '';
    // this.fillForm.input5.value = '';
    this.fillForm.input8.value = "";
    this.fillForm.input6.value = true;
    this.fillForm.input11.value = false;
    this.setDateFormat();
    this.setTimeFormat();
    this.setCurrencyFormat();
    this.setInput7Options();
    this.setInput10Options();
  }

  setFormFieldNames = () : void => {
    this.fillForm.input1.name = this.getTranslatedString("input1");
    this.fillForm.input2.name = this.getTranslatedString("input2");
    this.fillForm.input3.name = this.getTranslatedString("input3");
    this.fillForm.input4.name = this.getTranslatedString("input4");
    this.fillForm.input5.name = this.getTranslatedString("input5");
    this.fillForm.input6.name = this.getTranslatedString("input6");
    this.fillForm.input7.name = this.getTranslatedString("input7");;
    this.fillForm.input8.name = this.getTranslatedString("input8");
    this.fillForm.input9.name = this.getTranslatedString("input9");
    this.fillForm.input10.name = this.getTranslatedString("input10");
    this.fillForm.input11.name = this.getTranslatedString("input11");
    this.fillForm.input12.name = this.getTranslatedString("submit");
  }

  getTranslatedString = (key: string) : string => {
    return this.fillForm.language[key];
  }

  setDateFormat = () : void => {
    this.fillForm.input1.value = new Date().toISOString();
    this.fillForm.input1.dateSelectFormat = "MMM DD YYYY";
    this.fillForm.input1.dateDisplayFormat = "MMMM DDDD YYYY";
  }

  setTimeFormat = () : void => {
    this.fillForm.input9.timeFormat = "hh:mm a";
    var dummyTime = this.convertLocalToISOFormat()
    this.fillForm.input9.value = dummyTime;
  }

  //for now these are har-coded
  setCurrencyFormat = () : void => {
    this.fillForm.input3.currency = "$";
    this.fillForm.input4.currency = "EUR";
  }

  setInput7Options = () : void => {
    this.fillForm.input7.option1 = "Chicago";
    this.fillForm.input7.option2 = "LA";
    this.fillForm.input7.option3 = "San Jose";
    this.fillForm.input7.value = (typeof this.fillForm.selected7Value === 'undefined') ? "" : this.fillForm.selected7Value;
  }

  setInput10Options = () : void => {
    this.fillForm.input10.option1 = "Chicago";
    this.fillForm.input10.option2 = "LA";
    this.fillForm.input10.option3 = "San Jose";
    this.fillForm.input10.value = (typeof this.fillForm.selected10Value === 'undefined') ? "" : this.fillForm.selected10Value;
  }

  submitForm = () : void => {
    let self = this;
    if(!this.validateForm()) {
      return;
    }
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000,
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
        mediaType: Camera.MediaType.PICTURE,
        correctOrientation: true,
        saveToPhotoAlbum: false
    }).then((imageData) => {
        self.fillForm.selected7Value = self.fillForm.input7.value;
        self.fillForm.selected10Value = self.fillForm.input10.value;
        self.clearFields();
        self.saveImageInModel(imageData);
        self.showToast("Success", false);
      }, (err) => {
        self.showToast("CameraErr", false);
        return;
    });
  }

  saveImageInModel = (image: any) : void => {
    this.fillForm.imageArr.push('data:image/jpeg;base64,' + image);
  }

  //unit testable
  validateForm = () : boolean => {
    if(this.fillForm.input1.value === null) {
      this.showToast(this.getTranslatedString("input1"), true);
      return false;
    }
    else if(typeof this.fillForm.input2.value === 'undefined' || this.fillForm.input2.value === "") {
      this.showToast(this.getTranslatedString("input2"), true);
      return false;
    }
    else if(typeof this.fillForm.input3.value === 'undefined' || this.fillForm.input3.value === "") {
      this.showToast(this.getTranslatedString("input3"), true);
      return false;
    }
    else if(typeof this.fillForm.input4.value === 'undefined' || this.fillForm.input4.value === "") {
      this.showToast(this.getTranslatedString("input4"), true);
      return false;
    }
    else if(typeof this.fillForm.input5.value === 'undefined' || this.fillForm.input5.value === "") {
      this.showToast(this.getTranslatedString("input5"), true);
      return false;
    }
    return true;
  }

  showToast = (fieldName : string, isErrorToast : boolean) : void => {
    let toastMsg : string = "";
    if(fieldName === 'Success') {
      toastMsg = this.getTranslatedString("toastMsg3");
    } else if(fieldName === 'CameraErr') {
      toastMsg = this.getTranslatedString("toastMsg2");
    } else {
      toastMsg = fieldName + this.getTranslatedString("toastMsg1");
    }
    let toast = this.toastCtrl.create({
       message: toastMsg,
       duration: 2000,
       position: 'top'
     });
     toast.present();
  }

  clearFields = () : void => {
    this.initializePage()
  }

  //unit testable
  //android take date in ISO format
  convertLocalToISOFormat = () : string => {
    var today = new Date();
    var year = today.getFullYear()
    var month = (today.getMonth() + 1).toString();
    month = (month.length === 1) ? ("0" + month).slice(-2) : month;
    var day = (today.getDate().toString().length === 1) ? ("0" + today.getDate()).slice(-2) : today.getDate();
    var hours = (today.getHours().toString().length === 1) ? ("0" + today.getHours()).slice(-2) : today.getHours();
    var minutes = (today.getMinutes().toString().length === 1) ? ("0" + today.getMinutes()).slice(-2) : today.getMinutes();
    var seconds = (today.getSeconds().toString().length === 1) ? ("0" + today.getSeconds()).slice(-2) : today.getSeconds();
    var milliseconds = (today.getMilliseconds().toString().length === 1) ? ("0" + today.getMilliseconds()).slice(-2) : today.getMilliseconds();
    return year + "-" + month + "-" + day + "T" + hours +":" + minutes + ":" + seconds +"." + milliseconds + "Z";
  }

  addCurrency = (model: any) : void => {
    if (model.value.indexOf("$") !== 0 && model.value !== '') {
        model.value = model.currency + model.value;
     }
  }

}
