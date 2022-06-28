import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { AlertService } from 'src/app/_services/alert.service';
import { first } from 'rxjs/operators';
import { Response } from 'src/app/_models/response';

@Component({
  selector: 'app-user-address',
  templateUrl: './user-address.component.html',
  styleUrls: ['./user-address.component.scss']
})
export class UserAddressComponent implements OnInit {

  arrOrder:any =[];
  arrState:any =[];
  arrCity:any =[];
  arrCountry:any =[];
  arrdefaultAddress :any = [];
  showAddForm=false;
  selCountry:string =''
  defaultid :string = ''
  routetype:string=''
  form: FormGroup;
  loading = false;
  submitted = false;
  isErr:boolean = false;
  errormsg:string;
  isSuccess: boolean = false;
  succmsg :string ="";
  emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
  iserrcnf:boolean = false;;
arrUserAddress:any=[];
isAddressadded=false;
toastmsg:string='';
  //selCountry = ''
  routeState: any;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService,
    private SpinnerService: NgxSpinnerService,
    private alertService: AlertService
  ) {
    if(localStorage.getItem("uid") == null)
    {
      this.router.navigate(['/login-phone']);
  
    }

    this.form = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.pattern('^[a-zA-Z. ]*$')]],
      lastname: ['', [Validators.required, Validators.pattern('^[a-zA-Z. ]*$')]],
      phone: ['', [Validators.required,  Validators.pattern('[0-9 ]{10}')]],
      address_1: ['',Validators.required],
      city: ['',Validators.required],
      country: ['',Validators.required],
      state: ['',Validators.required],
      zip: ['',Validators.required],
      address_2: [''],
     
    
  });

  if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState) {
      this.routetype = this.routeState.type;
      if(this.routetype=='chkout')
      {
        this.showAddAddress();
      }
    }
  }

this.getAddresses();

   }

   showAddAddress()
   {
     this.showAddForm = true;
     //this.form.patchValue({
     // city: 'Ranchi',
    // });
   }


   hideAddAddress()
   {
    if(this.routeState=='chkout')
    {
      this.form.patchValue({
        firstname: '',
        lastname: '',
        address_1: '',
        address_2: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        phone: '',
      });
      this.router.navigate(['/checkout'])

    }
    else{
      this.form.patchValue({
      firstname: '',
      lastname: '',
      address_1: '',
      address_2: '',
      city: '',
      zip: '',
      state: '',
      country: '',
      phone: '',
    });

    this.arrUserAddress = [];
 
     this.showAddForm = false
    }
    
   }


   editAddress(i)
   {
      this.arrUserAddress = this.arrOrder.addresses[i];
      this.arrCity = [this.arrUserAddress.city]
      if(this.arrUserAddress.country !== '')
      {
          this.getStates();
      }
  console.log(this.arrUserAddress)
      this.form.patchValue({
        firstname: this.arrUserAddress.first_name,
        lastname: this.arrUserAddress.last_name,
        address_1: this.arrUserAddress.address_1,
        address_2: this.arrUserAddress.address_2,
        city: this.arrUserAddress.city,
        zip: this.arrUserAddress.zip,
        state: this.arrUserAddress.state,
        country: this.arrUserAddress.country,
        phone: this.arrUserAddress.phone,
      });


      this.showAddForm = true;
   }

    changeCountry()
    {
      console.log(this.selCountry)
      this.getStates();
    }

    changeCity()
    {
      console.log(this.selCountry)
      this.arrCity = ['Ranchi']
    }


   getStates()
  {
    this.accountService.getStates() 
       .subscribe(
           data => {
               console.log(data)
          
              this.arrState = data;

           },
           error => {
            
           });
  }

  deleteAddress(id)
  {
    this.accountService.deleteAddress(id) 
       .subscribe(
           data => {
               console.log(data)
          this.setdelMessage();
               this.getAddresses();
            //  this.arrState = data;

           },
           error => {
            
           });
  }
//updateDefAddress

updateDefAddress(id)
  {
    this.accountService.updateDefAddress(id) 
       .subscribe(
           data => {
               console.log(data)
          
               this.getAddresses();
            //  this.arrState = data;

           },
           error => {
            
           });
  }

   getAddresses()
  {let uid = localStorage.getItem("uid")
    this.accountService.getAddresses(uid) 
       .subscribe(
           data => {
               console.log(data)
          
              this.arrOrder = data;
               this.arrCountry = this.arrOrder.countries;
               this.defaultid = this.arrOrder.defaultAddress.address_id;

           },
           error => {
             // this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }

  ngOnInit() {

    

  
  }

  get f() { return this.form.controls; }



  onSubmit() {
    this.submitted = true;

   
    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    
    // stop here if form is invalid
    if (this.form.invalid) {
     // alert("err")
        return;
    }

    this.loading = true;

    let addressid = ''
    if(this.arrUserAddress.id != undefined )
    {
     addressid = this.arrUserAddress.id
    }
console.log(addressid)
    this.accountService.saveAddress(this.form.value,addressid)
        .subscribe(
            data => {
               let resp = new Response(data);
               //this.showAddForm = false;
               this.setMessage();
               this.getAddresses();
               this.hideAddAddress()
               // 
            },
            error => {
                this.alertService.error(error);
                this.loading = false;
            });
}


setMessage() {
   
  // Remove the first time from the array
 this.toastmsg = "Address added successfully"
  this.isAddressadded =true
  // Wait for the given amount of time
  setTimeout(() => {
    this.isAddressadded =false
      // Call the setDelay function again with the remaining times
     // setDelay(times);
  }, 3000);

}


setdelMessage() {
   
  // Remove the first time from the array
  this.toastmsg = "Address deleted"
  this.isAddressadded =true
  // Wait for the given amount of time
  setTimeout(() => {
    this.isAddressadded =false
      // Call the setDelay function again with the remaining times
     // setDelay(times);
  }, 3000);

}
}
