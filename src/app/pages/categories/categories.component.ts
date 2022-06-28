import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner"; 
import {Location} from '@angular/common';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  routeState: any;
  catid:string=''
  catslug:string;
  catname:string
  
  arrCategory:any =[];
  arrprevCategory:any =[];
  title = 'Categories';
  targetElement: Element;
  issubcat: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _location: Location,
    private SpinnerService: NgxSpinnerService,
    private accountService: ApiservicesService
  ) {

  /*   if(localStorage.getItem("uid") == null)
    {
      this.router.navigate(['/login']);
  
    } */

    this.accountService.pageRefresh.subscribe(x=> {
      let url = this.router.url;
      
    if(url === "/categories")
      this.allparentcategories();
   
       });


       if (this.router.getCurrentNavigation().extras.state) {
        this.routeState = this.router.getCurrentNavigation().extras.state;
        console.log(this.routeState)
        if (this.routeState) {
  
          
          this.catslug = this.routeState.slug;
          this.catid = this.routeState.cid;
          this.catname = this.routeState.name;

          this.subcategories(this.catid,this.catslug,this.catname)
        }
      }  


    this.allparentcategories();

   }

    back()
    {
     
      let arr = this.arrprevCategory[this.arrprevCategory.length-2]
      console.log(arr);
      this.arrprevCategory.pop(this.arrprevCategory.length-2)
      

      console.log(arr.id)
      if(this.arrprevCategory.length >1)
      {
        this.backsubcategories(arr.id,arr.slug,arr.name)
      }
      else{
        this.allparentcategories();
      }

     
    }


   getProducts(slug,name,parentid)
   {

   {
        this.subcategories(parentid,slug,name);
}


   }


   backsubcategories(id,slug,name)
   {
     this.SpinnerService.show(); 
     this.accountService.subcategories(id) 
        .subscribe(
            data => {
                console.log(data)
                this.SpinnerService.hide(); 
            //  let resp = new Response(data)
            //  console.log(resp.message);
            //  this.router.navigate(['/dashboard']);
                this.title = name;
             
               let arr = this.arrCategory;
               this.arrCategory = Object.values( data);
           //    this.issubcat = true;
               if(this.arrCategory.length ==0)
               {
               this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });
 
               }
               else{
 
                // this.router.navigate(['/categories'], { state: {cid: id,name:name,slug:slug,subcat:'1'} });
 
                 this.issubcat = true;
                
                    // this.arrprevCategory.push({id:id,slug:slug,name:name})
                     console.log(this.arrprevCategory);
      
               }
 
            },
            error => {
              // this.SpinnerService.hide();
               //this.alertService.error('Username or password is incorrect');
               //this.loading = false;
              // this.isErr= true;
            });
   }
 

   subcategories(id,slug,name)
  {
    this.SpinnerService.show(); 
    this.accountService.subcategories(id) 
       .subscribe(
           data => {
               console.log(data)
               this.SpinnerService.hide(); 
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);
               this.title = name;
            
              let arr = this.arrCategory;
              this.arrCategory = Object.values( data);
          //    this.issubcat = true;
              if(this.arrCategory.length ==0)
              {
              this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

              }
              else{

               // this.router.navigate(['/categories'], { state: {cid: id,name:name,slug:slug,subcat:'1'} });

                this.issubcat = true;
               
                    this.arrprevCategory.push({id:id,slug:slug,name:name})
                    console.log(this.arrprevCategory);
     
              }

           },
           error => {
             // this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }


   allparentcategories()
  {
    this.SpinnerService.show(); 
    this.accountService.allparentcategories() 
       .subscribe(
           data => {
               console.log(data)
               this.SpinnerService.hide(); 
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);
       this.title = "Categories"
       this.issubcat = false;
              this.arrCategory = Object.values( data);
              this.arrprevCategory = [];
              this.arrprevCategory.push("0")

           },
           error => {
             // this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }


  ngOnInit() {
    this.targetElement = document.querySelector('html');
  

  }

  myRefreshEvent(event: Subject<any>, message: string) {
   
    this.allparentcategories();
     setTimeout(() => {
        // alert(message);
         event.next();
     }, 3000);
 }

  gotoOrdeerDetsil(id)
  {

  }

}
