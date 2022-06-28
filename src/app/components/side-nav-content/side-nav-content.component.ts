import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Menu } from 'src/app/_models/menu';
import { ActivatedRoute, Router } from '@angular/router';
//import { ModalController } from '@ionic/angular';
import { SocialShareComponent } from '../social-share/social-share.component';
import { ModalController } from '@ionic/angular';
import { SocialSharingPage } from 'src/app/modals/social-sharing/social-sharing.page';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from 'src/environments/environment';
import { NgbModal ,ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-side-nav-content',
  templateUrl: './side-nav-content.component.html',
  styleUrls: ['./side-nav-content.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideNavContentComponent implements OnInit {

  navItems = [
    { label: 'Shop', route: '/products'},
    { label: 'Brands', route: '/brands'},
    { label: 'Company', route: '/company'},
    {label: 'Share',route:'/share'},
    { label: 'Terms & Conditions', route: '/terms'},
    { label: 'FAQ', route: '/faq'}
  ];

  arrPrimaryMenu: any = [];
  arrCategoryMenu: any = [];
  selectedMenu :number = -1
  closeModal: string;

  public sharingList = environment.socialShareOption;
  loader: any = null;
  sharingText = 'You can download our app from playstore or use this link to download the app. And you can share awesome coupons with your loved once, Thank you';
  emailSubject = 'Download Apps'
  recipent = ['support@cartigo.in'];
  sharingImage = '';
  // ['https://cartigo.in/storage/media/VU1S8X9yXo4huWQhbCZwkqbfas6YGsWNhTnzd2Ol.png'];
  sharingUrl = 'https://play.google.com/store/apps/details?id=com.cartigo.app';



  constructor(private router: Router,
    private apiserv: ApiservicesService,
    private socialSharing: SocialSharing,
    private modalService: NgbModal,
    public modalCtrl: ModalController) { }

  ngOnInit(): void {
    this.getCategories();
    this.primarymenu();
  
  }

  onNavigationSelection(navItem: any) {
    console.log(navItem.url);
    //https://grihanirman.com/brands  https://cartigo.in/

    if(navItem.url == "https://cartigo.in/products")
    {
      this.router.navigate(['/products'], { state: {type:"shop"} });

      //this.router.navigate(["/products"]);
    }
    if(navItem.url == "https://cartigo.in/brands")
    {
      this.router.navigate(["/brands"]);
    }
    if(navItem.url == "https://cartigo.in/about-us")
    {
      this.router.navigate(["/company"]);
    }
    if(navItem.url == "https://cartigo.in/terms-conditions")
    {
      this.router.navigate(["/terms"]);
    }
    if(navItem.url == "https://cartigo.in/faq")
    {
      this.router.navigate(["/faq"]);
    }


    
  }

  async showShareOptions() {
    
    console.log("abc");
    const modal = await this.modalCtrl.create({
      component: SocialSharingPage,
      cssClass: 'backTransparent',
      backdropDismiss: true
    });
    return await modal.present();
  }


  async shareVia(shareData) {
    if (shareData.shareType === 'viaEmail') {
      this.shareViaEmail();
    } 
    if (shareData.shareType === 'shareViaWhatsApp') {
     // this.socialSharing.canShareVia
      //this.socialSharing.shareViaWhatsApp(this.sharingText, this.sharingImage, this.sharingUrl)
      this.shareViaWhatsapp();
    } 
    if (shareData.shareType === 'shareViaFacebook') {
      // this.socialSharing.canShareVia
       //this.socialSharing.shareViaWhatsApp(this.sharingText, this.sharingImage, this.sharingUrl)
       this.shareViaFacebook();
     } 
     if (shareData.shareType === 'shareViaTwitter') {
      // this.socialSharing.canShareVia
       //this.socialSharing.shareViaWhatsApp(this.sharingText, this.sharingImage, this.sharingUrl)
       this.shareViaTwitter();
     } 
     if (shareData.shareType === 'shareViaInstagram') {
      // this.socialSharing.canShareVia
       //this.socialSharing.shareViaWhatsApp(this.sharingText, this.sharingImage, this.sharingUrl)
       this.shareViaInstagram();
     } 
    else {
      this.socialSharing[`${shareData.shareType}`](this.sharingText, this.sharingImage, this.sharingUrl)
      .then((res) => {
       // this.modal.dismiss();
      })
      .catch((e) => {
        console.log('error', e)
       // this.modal.dismiss();
      });
    }
  }
  shareViaEmail() {
    this.socialSharing.canShareViaEmail().then((res) => {
      this.socialSharing.shareViaEmail(this.sharingText, this.emailSubject, this.recipent, null, null, this.sharingImage).then(() => {
       // this.modal.dismiss();
      })
    }).catch((e) => {
      // Error!
    });
  }

  shareViaWhatsapp() {
    this.socialSharing.canShareVia('com.android.bluetooth,com.google.android.gms,com.facebook.katana','Hello WhatsApp', null, null)
      .then(() => {
        console.log('It works');
      }).catch((err) => {
        console.log("An error occurred ", err);
      });
  }

  shareViaFacebook() {
    this.socialSharing.shareViaFacebook('Hello Friends', null, 'https://codevampires.com/')
      .then(() => {
        console.log('It works');
      }).catch(() => {
        alert('Facebook not available')
      });
  }

  // Share Via Twitter
  shareViaTwitter() {
    this.socialSharing.shareViaTwitter('Hello Twitter', null, 'https://codevampires.com/')
      .then(() => {
        console.log('It works');
      }).catch(() => {
        alert('Twitter not available');
      });
  }

  // Share Via Instagram
  shareViaInstagram() {
    this.socialSharing.canShareVia('instagram','Hello Instagram', null)
      .then(() => {
        console.log('It works');
      }).catch(() => {
        alert('Instagram not available');
      });
  }

  onNavigationSelection1(navItem: any) {
    console.log(navItem.slug);
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
  }
  this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/products'], { state: {cid: navItem.slug,name:navItem.name,type:'category'} });

    //  this.apiserv.getCategory("","",navItem.slug,"","","","","","").
   //   subscribe(
    //    data2 => {
  
   //     console.log(data2);
          //console.log('Data:', this.countryInfo);
    //    },
    //    err => console.log(err),
    //    () => console.log('complete')
    //  )
  }


  primarymenu(){
    this.apiserv.primarymenu().
    subscribe(
      data2 => {

        this.arrPrimaryMenu = data2;
       console.log(this.arrPrimaryMenu);
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  getCategories(){
    this.apiserv.categorymenu().
    subscribe(
      data2 => {
      

       this.arrCategoryMenu = data2;
      
        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

  title = 'childmenu';
  public menus = new Array();
  public submenu = new Array();
  navmenuclick(value){
    for(let i= 0; i<5; i++){
      if(i != value){
          this.menus[i] = false;  
          /*Submenu Code Start*/
          this.submenu[i+'.'+0] = false;
          this.submenu[i+'.'+1] = false;
          /*Submenu Code Close*/
      }
    }
    if(this.menus[value] == true){
      this.menus[value] = false;  
    }else{
      this.menus[value] = true;  
    }
 }



 toggle(index: number) {
   
  if(this.selectedMenu == index)
  {
 this.selectedMenu = -1
  }
  else{
    this.selectedMenu = index;
  }
  

  console.log(this.selectedMenu)
  
}


/////////////////////////////////////
triggerModal(content) {
  let ref = localStorage.getItem('referal')
    this.sharingText = 'You can download our app from playstore or use this link to download the app. And you can share awesome coupons with your loved once,use referal code "'+ref+'" at the time of registeration Thank you';
  console.log(this.sharingText);
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
    this.closeModal = `Closed with: ${res}`;
  }, (res) => {
    this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}

}
