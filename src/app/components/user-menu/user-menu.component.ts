import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

 
  clsDash :string ='';
  clsOrder:string='';
  clsDownld:string='';
  clsWish:string='';
  clsReview:string='';
  clsAddr:string='';
  clsProfile:string='';
  clsCoupon:string=''
  @Input() public type: string;

  isVendor = false;

  constructor(private route: ActivatedRoute,
    private fireAuth: AngularFireAuth,
    private router: Router,private apiserv: ApiservicesService)  { }


  ngOnInit() {
    if(this.type=="dash")
    {
      
      this.clsDash="active";
    }
    if(this.type=="profile")
    {
      
      this.clsProfile="active";
    }
    if(this.type=="orders")
    {
      
      this.clsOrder="active";
    }
    if(this.type=="reviews")
    {
      
      this.clsReview="active";
    }
    if(this.type=="downld")
    {
      
      this.clsDownld="active";
    }
    if(this.type=="addr")
    {
      
      this.clsAddr="active";
    }
    if(this.type=="wish")
    {
      
      this.clsWish="active";
    }
    if(this.type=="coupon")
    {
      
      this.clsCoupon="active";
    }
  }

  gotoDashboard()
  {
    this.clsDash="active";
    this.clsOrder='';
  this.clsDownld='';
  this.clsWish='';
  this.clsReview='';
  this.clsAddr='';
  this.clsProfile=''

  this.router.navigate(['/dashboard']);

  }

  gotoProfile()
  {
    
  this.router.navigate(['/profile']);

  }

  logout()
  {
   localStorage.removeItem('uid')
   localStorage.removeItem('cartid')
   this.fireAuth.signOut().then(() => {
   localStorage.removeItem('isSocialLogin')
  });

  //localStorage.clear();
    this.router.navigate(['/login-phone']);
  }

}
