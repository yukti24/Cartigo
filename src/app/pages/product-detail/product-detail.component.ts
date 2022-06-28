import { Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute, NavigationStart,Event  , RouterEvent, NavigationEnd, NavigationError } from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { filter } from 'rxjs/operators';
import { NavigationService } from 'src/app/services/navigation.service';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { NgxSpinnerService } from "ngx-spinner";  
import { ToastController } from '@ionic/angular';
import { AlertService } from 'src/app/_services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  arrProd:any =[];
  arrCart:any =[];
  arrorder:any =[]
  arrb:any=[];
  arrPrice:any=[];
  slug:string='';
routeState: any;
prodname:string=""
urlfb:string="";
urltw:string="";
urllikdn:string='';
urltumb="";
breadstr='<li><a href="/home">Home</a></li> ';
arrwishlist:any=[];
wishCls :string ='btn btn-wishlist';
wishiconCls = 'la-heart lar'
iswishlist:boolean=false;
ismsg :boolean = false;

bigimg:string ='';
  prodprice: any;
  prodorigprice:any;
  prodSavePrice:any;
  prodFirstPrice:any;
  prodFirstSavePrice:any;
  currQty:number=1;
  selectedIndex: number = null;
type:string=''
public _album: any = [];

isAddtocart = false;
isData:boolean = false

lightboxcss:string="modal"

selectType:any=[];

form: FormGroup;
submitted = false;
isErr:boolean = false;
errormsg:string;
isSuccess: boolean = false;
succmsg :string ="Review added successfully";
emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";
iserrcnf:boolean = false;;
ratingvalue=0;
errRating= false
arrreview:any =[];
reviewcnt:string;
chkstatus5:boolean = false;
chkstatus4:boolean = false;
chkstatus3:boolean = false;
chkstatus2:boolean = false;
chkstatus1:boolean = false;
toastmsg:string=''
isrev=false
@ViewChildren('radioInput') radioInputs: ElementRef[];


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: ApiservicesService,
    public _lightbox: Lightbox,
    private cartService: CartserviceService,
    private SpinnerService: NgxSpinnerService,
    private toastCtrl: ToastController,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
    


    if (this.router.getCurrentNavigation().extras.state) {
      this.routeState = this.router.getCurrentNavigation().extras.state;
      console.log(this.routeState)
      if (this.routeState) {

        
        this.slug = this.routeState.slug;
        this.prodname = this.routeState.name;
        
        localStorage.setItem("slug",this.slug);
        localStorage.setItem("name",this.prodname)

        this.urlfb = "https://www.facebook.com/sharer/sharer.php?u=https://cartigo.in/products/"+this.slug;
        this.urltw = "https://twitter.com/share?url=https://cartigo.in/products/"+this.slug;
        this.urllikdn = "http://www.linkedin.com/shareArticle?mini=true&amp;url=https://cartigo.in/products/"+this.slug;
        this.urltumb = "http://www.tumblr.com/share?v=3&amp;u=https://cartigo.in/products/"+this.slug;

       
       
        //this.data.site = this.routeState.site ? this.routeState.site : '';
        //  console.log(this.cid);
       this.getProductDetail(this.slug);
        this.setIndex(0);
        //this.getUserCart();
        
       
       // this.getLatestProducts();
      }
      
    }
   else{
      this.slug = localStorage.getItem('slug')
      this.prodname = localStorage.getItem('name')
      
     // localStorage.setItem("slug",this.slug);
     // localStorage.setItem("name",this.prodname)

      this.urlfb = "https://www.facebook.com/sharer/sharer.php?u=https://cartigo.in/products/"+this.slug;
      this.urltw = "https://twitter.com/share?url=https://cartigo.in/products/"+this.slug;
      this.urllikdn = "http://www.linkedin.com/shareArticle?mini=true&amp;url=https://cartigo.in/products/"+this.slug;
      this.urltumb = "http://www.tumblr.com/share?v=3&amp;u=https://cartigo.in/products/"+this.slug;

     
     
      //this.data.site = this.routeState.site ? this.routeState.site : '';
      //  console.log(this.cid);
     this.getProductDetail(this.slug);
      this.setIndex(0);
    }


   }

Toast1()
{
 // alert("gg");
  this.radioInputs.forEach((element) => {
    element.nativeElement.checked = false;
  });
this.ratingvalue=0
}

async showToast() {
  console.log("ok clicked");
  await this.toastCtrl.create({
    message: "Hey! it's a toast",
    duration: 2000,
    position: 'middle',
    buttons: [{
      text: 'OK',
      handler: () => {
        console.log("ok clicked");
      }
    }]
  }).then(res => res.present());
}


 setIndex(index: number) {
      this.selectedIndex = index;
   }

   getProductDetail(id)
  {
    this.SpinnerService.show(); 
    this.accountService.getProductDetail(id) 
       .subscribe(
           data => {
               console.log(data)
               this.SpinnerService.hide(); 
           //  let resp = new Response(data)
           //  console.log(resp.message);
           //  this.router.navigate(['/dashboard']);
   this.isData = true;
              this.arrProd = data;
              this.bigimg = this.arrProd.product.base_image.path;
              //product.base_image.filename
              this.prodprice = this.arrProd.product.selling_price.formatted;
              this.prodorigprice = this.arrProd.product.price.formatted;
              this.prodname = this.arrProd.product.name;
              this.prodFirstPrice = this.arrProd.product.selling_price.formatted;

              this.prodSavePrice = this.arrProd.product.selling_price.amount;
              this.prodFirstSavePrice = this.prodFirstPrice
             let breadcrumb = this.arrProd.categoryBreadcrumb;
             var newarr = breadcrumb.split(","); 

             this.arrb =breadcrumb.split(","); 
             
             for(let i=1;i<newarr.length;i++)
             {
                console.log(newarr[i])
                 let str1 = newarr[i].split(":");
//<li><a href="https://grihanirman.com">Home</a></li> 
                this.breadstr += ">  <li><a href='javascript:void(0)' (click) = gotoCategory1("+ i +")>"+ str1[1]+ "</a></li>";

             }

             let src1 = this.arrProd.product.base_image.path;
             let caption1 = this.arrProd.product.name;
             let thumb1 = this.arrProd.product.files[0].path;
             const album1 = {
                src: src1,
                caption: caption1,
                thumb: thumb1
             };
       
             this._album.push(album1);
if(this.arrProd.product1[0].files.length>0){
              for (let i = 0; i < this.arrProd.product1[0].files.length; i++) {
              // console.log(this.arrProd.product.files[i]);product1[0].files
                
                const src = this.arrProd.product1[0].files[i].path;
                const caption = this.arrProd.product1[0].name;
                const thumb = this.arrProd.product1[0].files[i].path;
                const album = {
                   src: src,
                   caption: caption,
                   thumb: thumb
                };
              
                this._album.push(album);
              }
            }
          
            

console.log(this._album)


             // this.prodname = this.arrProd.product.name
this.getWushlistProd(this.arrProd.product.id)
this.getReviews();
           },
           error => {
             // this.SpinnerService.hide();
              //this.alertService.error('Username or password is incorrect');
              //this.loading = false;
             // this.isErr= true;
           });
  }


  setvalue(num)
  {
    this.errRating = false
    this.ratingvalue = num;
  }

  ngOnInit() {
    
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
          // Show loading indicator
          if (event.navigationTrigger === 'popstate') {
            // Perform actions
            console.log(event.restoredState);
            if (event.restoredState) {
             // this.slug = event.restoredState.slug;
             // this.prodname = event.restoredState.name;
              console.log('str') 
      
             
             
      
            }
          }
      }

      if (event instanceof NavigationEnd) {
          // Hide loading indicator
          
            console.log('end') 
        //  this.getProductDetail(this.slug);
        //  this.setIndex(0);
      }

      if (event instanceof NavigationError) {
          // Hide loading indicator
             
          // Present error to user
          console.log(event.error);
      }
  });

  
    this.form = this.formBuilder.group({
      reviewer_name: ['', [Validators.required, Validators.pattern('^[a-zA-Z. ]*$')]],
      comment: ['', Validators.required],
    //  email: ['', [Validators.required,Validators.pattern(this.emailPattern)]],
     // repassword: ['', Validators.required],
     // chkPolicy: [false, Validators.requiredTrue],
    
  });
  }

  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      console.log(this.f.reviewer_name.value);
     

      // reset alerts on submit
      this.alertService.clear();

      if(this.ratingvalue==0)
      {

        this.errRating = true
        return;
      }
      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

       let pid = this.arrProd.product.id
    //  this.loading = true;
      this.accountService.addReview(this.form.value,this.ratingvalue,pid)
         .subscribe(
              data => {
                
             // alert("Registration successful");
           //  this.isSuccess = true;
           //  this.isErr = false;
        this.getReviews();
this.setReviewMessage();
        this.chkstatus1 = false;
        this.form.reset();

        this.form.get('reviewer_name').clearValidators();
        this.form.get('comment').clearValidators();

        this.form.patchValue({
          reviewer_name: '',
          comment: '',
         
        });
this.Toast1()

              },
              error => {
                  this.alertService.error(error);
                 // this.loading = false;
              });
  }


  getReviews()
  {
    let pid = this.arrProd.product.id
    this.accountService.getProdReviews(pid) 
       .subscribe(
           data => {
              // console.log(data);
               this.arrreview = data;
               console.log(this.arrreview.data.length);
               this.reviewcnt = this.arrreview.data.length;
           },
           error => {
           
           });
  }



  showimg(path)
  {
    this.bigimg = path;
  }

  qtyUp()
  {
    this.currQty = this.currQty +1;

  }

  qtyDown()
  {
  if(this.currQty>1)
  {
    this.currQty = this.currQty - 1;
  }

  }

  getprodprice(optid)
  {
    console.log(optid)
    let id = this.selectType.option_id;

    if(optid !== ''){
    this.accountService.getProductPrice(id,this.selectType.id,this.arrProd.product.id) 
    .subscribe(
        data => {
            console.log(data)
            this.arrPrice = data;
          
            this.prodprice = this.arrPrice.variantPrice;
            this.prodorigprice = this.arrPrice.price;
            this.prodSavePrice = this.arrPrice.variantPrice.substring(1);
            
            
        //  let resp = new Response(data)
        //  console.log(resp.message);
        //  this.router.navigate(['/dashboard']);

          
        },
        error => {
          // this.SpinnerService.hide();
           //this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });
      }
      else{
        this.prodprice = this.prodFirstPrice;
        this.prodSavePrice

      }
  }

  addToCart()
  {

    if(localStorage.getItem("uid") == null)
    {
     
      this.router.navigate(['/login-phone'], { state: {id: 'cart'} });

    }
    let id = this.selectType.id;
   console.log( this.selectType.length) ;

//return false;
    let optid = this.selectType.option_id;
   let price = parseFloat(this.prodSavePrice);
    let cartid = localStorage.getItem('cartid')
    if(cartid == 'undefined' || cartid == null)
    {
      cartid = ''
    }
       console.log(cartid);
   if(this.arrProd.product.options.length>0)
   {
        
    if(this.arrProd.product.options[0].is_required)
    {
      if(this.selectType.length==0)
      {
        this.ismsg = true;
        return false
      }
    }
  //  this.SpinnerService.show(); 
    this.accountService.addtoCart(id,optid,this.arrProd.product.id,this.currQty,price,'0','',cartid) 
    .subscribe(
        data => {
            console.log("added to cart")
        
           // this.SpinnerService.hide(); 
          // 
          this.setCartMessage();
            this.getUserCart();
         //   this.cartService.setShowCart(true);
     // this.isAddtocart = true;
       //  this.alertService.success("product added to cart")
                this.arrorder = data;
             
            
          
        },
        error => {
          // this.SpinnerService.hide();
           //this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });
   }
   else{



    this.accountService.addtoCart('0','0',this.arrProd.product.id,this.currQty,price,'0','',cartid) 
    .subscribe(
        data => {
            console.log(data)
          
            this.arrorder = data;
          
          this.setCartMessage();
           // this.router.navigate(['/complete'], { state: {orderid: this.arrorder.order.id,type:'product'} });
this.getUserCart();
//this.alertService.success("product added to cart")
//this.cartService.setShowCart(true);
          
        },
        error => {
          // this.SpinnerService.hide();
           //this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });
   }
   
  }


   setCartMessage() {
   
      // Remove the first time from the array
     this.toastmsg = "Product added to cart"
      this.isAddtocart =true
      // Wait for the given amount of time
      setTimeout(() => {
        this.isAddtocart =false
          // Call the setDelay function again with the remaining times
         // setDelay(times);
      }, 3000);
   
  }

  setReviewMessage() {
   
    // Remove the first time from the array
   this.toastmsg = "Review added successfully"
    this.isAddtocart =true
    // Wait for the given amount of time
    setTimeout(() => {
      this.isAddtocart =false
        // Call the setDelay function again with the remaining times
       // setDelay(times);
    }, 3000);
 
}


  addwishlist(id)
  {
    if(localStorage.getItem("uid") == null)
    {
     
      this.router.navigate(['/login-phone'], { state: {id: 'cart'} });

    }
    if(this.iswishlist)
    {
      this.accountService.remWishlist(id) 
      .subscribe(
          data => {
              console.log(data)
              this.getWushlistProd(this.arrProd.product.id)
  
       
          },
          error => {
          
          });
    }
    else{
      this.accountService.addWishlist(id) 
      .subscribe(
          data => {
              console.log(data)
              this.getWushlistProd(this.arrProd.product.id)
  
       
          },
          error => {
          
          });
    }
   
  }

  getUserCart()
  {
    this.accountService.getUserCart() 
    .subscribe(
        data => {
         //   console.log(data)
         this.arrCart= data;
             //  cart[0].id cart[0].id
            
             if(this.arrCart.cart.products.length >0){
              console.log(this.arrCart.cart.id);

              localStorage.setItem('cartid',this.arrCart.cart.id)
              localStorage.setItem('cartno',this.arrCart.cart.products.length)
             }
             else{
              localStorage.removeItem('cartid');

             }

          
        },
        error => {
         
        });
  }

  getWushlistProd(id)
  {
   
    this.accountService.getWushlistProd(id) 
    .subscribe(
        data => {
            console.log(data)
         this.arrwishlist = data;
         if(this.arrwishlist.length >0)
         {
          this.wishCls = 'btn btn-wishlist added'
          this.wishiconCls = 'la-heart las'
          this.iswishlist = true
         }
         else{
          this.wishCls = 'btn btn-wishlist'
          this.iswishlist = false
          this.wishiconCls = 'la-heart lar'
         }
          
        //  let resp = new Response(data)
        //  console.log(resp.message);
        //  this.router.navigate(['/dashboard']);

          
        },
        error => {
          // this.SpinnerService.hide();
           //this.alertService.error('Username or password is incorrect');
           //this.loading = false;
          // this.isErr= true;
        });
  }

  gotoCategory(slug,name)
  {
    this.router.navigate(['/products'], { state: {cid: slug,name:name,type:'category'} });

  }

  getcategoryname(str)
  {
    let str1 = str.split(":");
    return str1[1];
  }

  gotoCategory1(i)
  {
    let breadcrumb = this.arrProd.categoryBreadcrumb;
    var newarr = breadcrumb.split(","); 
    console.log(i);
    let str1 = newarr[i+1].split(":");
    console.log(newarr)
    console.log(str1[1])
    this.router.navigate(['/products'], { state: {cid: str1[0],name:str1[1],type:'category'} });
     
  }

  getwidth(num)
  {
  if(num == "1")
  {
    return "width:20%"
  }
  if(num == "2")
  {
    return "width:40%"
  }
  if(num == "3")
  {
    return "width:60%"
  }
  if(num == "4")
  {
    return "width:80%"
  }
  if(num == "5")
  {
    return "width:100%"
  }

  }

  open(index: number): void {
    // open lightbox
    console.log(index)
    console.log(this._album);
    this._lightbox.open(this._album, index);

    //this.lightboxcss ="modal show"
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  // this.lightboxcss ="modal "
  }


  doRefresh(event) {
    this.getProductDetail(this.slug)

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
