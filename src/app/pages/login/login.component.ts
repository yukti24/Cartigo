import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router } from '@angular/router';
import { Response } from 'src/app/_models/response';
import { AlertService } from 'src/app/_services/alert.service';
import { LoadingController } from '@ionic/angular';

import { User } from 'src/app/_models/user';

import { AngularFireAuth } from '@angular/fire/auth';
import { Platform } from '@angular/cdk/platform';
import firebase from "firebase/app";
import "firebase/auth";
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  emailPattern = "^[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\.[a-z]{2,4}$";
  routeState: any;
  submitted = false;
  arrResp:any =[];
  loggedIn: boolean;
userSave = new User()
 auth:any;
  isLoggedin: boolean;  
  uuid:string=''
  arrcart:any=[]
page : string = ''
authStateSubject$ = new BehaviorSubject<firebase.User>(null);
@Output() userSocialLogin = new EventEmitter();

public isGoogleLogin = false;
public loading;

  constructor(  private formBuilder: FormBuilder,
   
    private router: Router,
    private alertService: AlertService,
    private accountService: ApiservicesService,
    private google: GooglePlus,
    private fireAuth: AngularFireAuth,
    private platform: Platform,
    private fb: Facebook,
  
    public loadingController: LoadingController,
   
   ) { 

    this.auth = firebase.auth;

  if(localStorage.getItem("uid") !== null)
  {
    this.router.navigate(['/home']);

  }
  /* this.uniqueDeviceID.get()
  .then((uuid: any) => this.uuid = uuid)
  .catch((error: any) => console.log(error));
 */
  if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState) {
     // this.cid = this.routeState.cid;
      this.page = this.routeState.id;

    }
  }


  this.userSocialLogin.subscribe(x=> {
    console.log("usersocial")
     console.log(x);
     let arrcart = x;
     //let cart = arrcart.cart
     this.RegisterSocialUser(x)
    

  });




    }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
      password: ['', Validators.required]
      
      
  });

   //this.fireAuth.currentUser
  //this.LoginGoogletoDB();
  /* this.authService.authState.subscribe((user) => {
    this.user = user;
    this.loggedIn = (user != null);
  });
 */

  }



  get f() { return this.form.controls; }


  getUserCart()
  {
    this.accountService.getUserCart().
    subscribe(
      data2 => {
        this.arrcart = data2;
        if(this.arrcart.cart)
       {
        localStorage.setItem('cartno',this.arrcart.cart.products.length)

       }
      
     // this.router.navigate(['/home']);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  onSubmit() {
      this.submitted = true;

      
      // reset alerts on submit
      console.log(this.uuid);

      // stop here if form is invalid
      if (this.form.invalid) {
        console.log("fgfgf");
          return;
      }
     
     // this.loading = true;
      let islogin = false;
      this.alertService.clear();
      this.uuid = localStorage.getItem('devicetoken')
      let userdb = new User();
      userdb.email = this.f.email.value.trim();
      userdb.password = this.f.password.value.trim();
     // userdb.firstname = 'Aniket'
     // userdb.lastname = 'Verma'
     // userdb.phone= '7032909455'
      userdb.uuid = this.uuid;
      //'cwtclKnNRQiMzZmxauq4iF:APA91bHGvWVrrqHBci6Hmyx8utSH4K9fNl0y8zovF2NdZJ6noaHqPcdJV-UCpQK03w2S4D1oTRf9AoC99ZqoRa_ju5kPCzJNsm0zVxYNBR_qpROWms8LzKsvpj7c-rxdlzZTJsn6T7Te';
      //
       this.accountService.Login(this.f.email.value.trim(), this.f.password.value,this.uuid) 
       .subscribe(
           data => {
               console.log(data)
             let resp = new Response(data)
             if(resp.message=="success")
             {
              localStorage.setItem("uid",resp.id);
              console.log(resp.message);
       this.getUserCart();
       if(this.page =='')
       {
         this.router.navigate(['/home']);
         }
         else
         {
           this.router.navigate(['/product-detail']);
         }
             }
              else{
                this.alertService.error('Username or password is incorrect');

              }

           },
           error => {
             // this.SpinnerService.hide();
              this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });

          
        

    
  }

  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
   /*  if(socialPlatform == "facebook"){
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    }else if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
      console.log(socialPlatformProvider)


    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
       // ...
            
      }
    ); */
  }

  doLogin(){
    let params: any;
    if (this.platform.ANDROID) {
     // if (this.platform.is('android')) 
      
        params = {
          webClientId: '880628991732-is1o940vck28durap8sdvvalpavc332u.apps.googleusercontent.com', //  webclientID 'string'
          offline: true
        };
      
       this.google.login(params)
      .then((response) => {
        const { idToken, accessToken } = response;
        this.onLoginSuccess(idToken, accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + JSON.stringify(error));
      });
    } else{
      console.log('else...');
      this.fireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(success => {
        console.log('success in google login', success);
        this.isGoogleLogin = true;
       // this.user =  success.user;
      }).catch(err => {
        console.log(err.message, 'error in google login');
      });
    } 
  }
  onLoginSuccess(accessToken, accessSecret) {
    const credential = accessSecret ? firebase.auth.GoogleAuthProvider
        .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
            .credential(accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((success) => {
        //alert('successfully');
        console.log(success.user)
        this.isGoogleLogin = true;
       // this.router.navigate(['/midlogin']);
       this.LoginGoogletoDB();
      //  this.user =  success.user;
       // this.loading.dismiss();
      });

  }
  onLoginError(err) {
    console.log(err);
  }
  logout() {
    this.fireAuth.signOut().then(() => {
      this.isGoogleLogin = false;
    });

    
  }


  LoginGoogletoDB(){
     
    let that = this

    that.fireAuth.onAuthStateChanged(user => {
      if (user) {
        
        let userDb = new User();
          userDb.firstname = user.displayName;
        /*  if (user.displayName.split(' ').length>1)
          {
            userDb.lastname = user.displayName.split(' ')[1].toString();

          } */
          userDb.email = user.email;
          userDb.phone = user.phoneNumber;
          console.log(userDb.firstname)
          this.userSocialLogin.emit(userDb);

          
      }
      else {
       // this.router.navigate(["/home"]);
      }
    })
  }
  

  async loginFB() {

    this.fb.login(['email'])
      .then((response: FacebookLoginResponse) => {
        this.onLoginSuccessFB(response);
        console.log(response.authResponse.accessToken);
      }).catch((error) => {
        console.log(error);
        alert('error:' + error);
      });
  }

  onLoginSuccessFB(res: FacebookLoginResponse) {
    // const { token, secret } = res;
    const credential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
    this.fireAuth.signInWithCredential(credential)
      .then((response) => {
       // this.router.navigate(['/profile']);
       this.LoginGoogletoDB();
       // this.loading.dismiss();
      });

  }


  RegisterSocialUser(userDb: User)
  {
   // var user = firebase.auth().currentUser;
  //userDb.lastname = 'Ajj'
   
  console.log(userDb.firstname)
    userDb.lastname =''
      let name = userDb.firstname.split(' ')
       console.log(name)
        let fname = name[0];

      if( userDb.firstname.split(' ').length > 1){

        userDb.lastname = name[1]
      }
      
     
      userDb.firstname = fname
      console.log(userDb.lastname)
      userDb.uuid =  localStorage.getItem('devicetoken')
    this.accountService.LoginSocial(userDb) 
    .subscribe(
        data => {
           
          let resp = new Response(data)
        

       this.arrResp = data;
   console.log(this.arrResp.user)

          if(resp.message=="success")
          {
           localStorage.setItem("uid",this.arrResp.user.id);
           localStorage.setItem('isSocialLogin','1')

           this.getUserCart();
          if(this.page =='')
          {
            this.router.navigate(['/home']);
            }
            else
            {
              this.router.navigate(['/product-detail']);
            }
           
          }
          else if(resp.message =='user exists')
          {
            localStorage.setItem("uid",this.arrResp.user.id);
            localStorage.setItem('isSocialLogin','1')
 
            this.getUserCart();
            if(this.page =='')
            {
              this.router.navigate(['/home']);
              }
              else
              {
                this.router.navigate(['/product-detail']);
              }
          }
           else{
            this.alertService.error('Username or password is incorrect');

           }

        },
        error => {
          // this.SpinnerService.hide();
          this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });

  }


/* 
  googleLoginOptions = {
    scope: 'profile email'
  }; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig
  
  
  
  loginWithGoogle()
  {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
   */
}
