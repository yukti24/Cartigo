import { Component, ViewEncapsulation } from '@angular/core';
import { FCM } from "cordova-plugin-fcm-with-dependecy-updated/ionic/ngx";

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'simple-side-nav';
arrEx :any =[];
  onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
}

constructor(
  private platform: Platform,
  private splashScreen: SplashScreen,
  //private statusBar: StatusBar,
  private fcm: FCM
) {
  this.initializeApp();
}

initializeApp() {
  this.platform.ready().then(() => {
    //this.statusBar.styleDefault();
    this.splashScreen.hide();

    // subscribe to a topic
    // this.fcm.subscribeToTopic('Deals');

    // get FCM token
    this.fcm.getToken().then(token => {
      console.log(token);
      localStorage.setItem("devicetoken",token)
    });

    // ionic push notification example
    this.fcm.onNotification().subscribe(data => {
      console.log(data);
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });      

    // refresh the FCM token
    this.fcm.onTokenRefresh().subscribe(token => {
      console.log(token);
      localStorage.setItem("devicetoken",token)
    });

    // unsubscribe from a topic
    // this.fcm.unsubscribeFromTopic('offers');

  });
}

}
