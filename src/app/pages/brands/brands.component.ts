import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";  

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  

  arrBrands:any =[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private SpinnerService: NgxSpinnerService,
    private accountService: ApiservicesService
  ) {

    // if(localStorage.getItem("uid") == null)
    // {
    //   this.router.navigate(['/login']);
  
    // }
    this.getBrands();

    this.accountService.pageRefresh.subscribe(x=> {
     
      let url = this.router.url;
      
    //if(url === "/brands")
     // this.getBrands();
 
    });
   }

   getBrandData(slug,name)
   {

    this.router.navigate(['/products'], { state: {brand: slug,name:name,type:'brand'} });

   }


   getBrands()
  {
    this.SpinnerService.show(); 
    this.accountService.getBrands() 
       .subscribe(
           data => {
               console.log(data)
               this.SpinnerService.hide(); 
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);

              this.arrBrands = data;

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

  gotoOrdeerDetsil(id)
  {

  }

}
