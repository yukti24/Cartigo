import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import firebase from 'firebase/app';
import { environment } from '../../../environments/environment';
import { FbauthService } from 'src/app/services/fbauth.service';
import { WindowService } from '../../window.service';
import 'firebase/auth';

import {Firebase} from '@ionic-native/firebase/ngx';


firebase.initializeApp(environment.firebaseConfig);

@Component({
  selector: 'app-login1',
  templateUrl: './login1.component.html',
  styleUrls: ['./login1.component.scss']
})
export class Login1Component  implements OnInit {
  windowRef: any;
  CountryJson = environment.CountryJson;
  OTP: string = '';
  Code: any;
  PhoneNo: any;
  CountryCode: any = '91';
  showOTPInput: boolean = false;
  OTPmessage: string = 'An OTP is sent to your number. You should receive it in 15 s'
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  confirmationResult: any;
  constructor(private win: WindowService,
    private alertController: AlertController,
    private authService: FbauthService,
    private fireNative: Firebase,
  ) { 

    const firebaseConfig = {
      databaseURL: "https://cartigo-332307.firebaseio.com",
      

      apiKey: "AIzaSyCCYBCU_n0BPm-qmFG0yNN6PtlijqfgeJc",
      authDomain: "cartigo-332307.firebaseapp.com",
      projectId: "cartigo-332307",
      storageBucket: "cartigo-332307.appspot.com",
      messagingSenderId: "880628991732",
      appId: "1:880628991732:web:53c97c23b4f14a5ef940a1",
      measurementId: "G-GQZ25D4V7Q"
    };

    console.log(firebase.apps.length);
    if (!firebase.apps.length) {
     
    }

  

  }


  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    
    this.windowRef = this.win.windowRef
   // this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      size: 'invisible',
      callback: (response) => {
        console.log(response);
      },
      'expired-callback': () => {
      }
    });
   
   
    this.windowRef.recaptchaVerifier.render()
  }
  
  ngOnInit() {
      
   
    

   // alert("fh")
  /*   this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response) => {

      },
      'expired-callback': () => {
      }
    }); */
  }

  countryCodeChange($event) {
    this.CountryCode = $event.detail.value;
  }
  // Button event after the nmber is entered and button is clicked
  signinWithPhoneNumber() {
    const appVerifier = this.windowRef.recaptchaVerifier;
    console.log('country', appVerifier);
   this.CountryCode = "+"+this.CountryCode
    if (this.PhoneNo && this.CountryCode) {
      this.authService.signInWithPhoneNumber(appVerifier, this.CountryCode + this.PhoneNo).then(
        success => {
          this.OtpVerification();
        }
      );
    }
  }
  async showSuccess() {
    const alert = await this.alertController.create({
      header: 'Success',
      buttons: [
        {
          text: 'Ok',
          handler: (res) => {
            alert.dismiss();
          }
        }
      ]
    });
    alert.present();
  }
  async OtpVerification() {
    const alert = await this.alertController.create({
      header: 'Enter OTP',
      backdropDismiss: false,
      inputs: [
        {
          name: 'otp',
          type: 'text',
          placeholder: 'Enter your otp',
        }
      ],
      buttons: [{
        text: 'Enter',
        handler: (res) => {
          this.authService.enterVerificationCode(res.otp).then(
            userData => {
              this.showSuccess();
              console.log(userData);
            }
          );
        }
      }
      ]
    });
    await alert.present();
  }

}
