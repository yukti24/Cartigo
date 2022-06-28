import { Component, OnInit ,Output,EventEmitter,Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { Product } from '../_models/product';
import { Response } from '../_models/response';
import { Cart } from '../_models/cart';
import { Address } from '../_models/address';
import { Order } from '../_models/order';
import { Review } from '../_models/review';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*',


  })
}


@Injectable({
  providedIn: 'root'
})
export class ApiservicesService {

  menuurl :string = "https://cartigo.in/menus/";
  @Output() userLogin = new EventEmitter();
  @Output() userCart = new EventEmitter();
  @Output() pageRefresh = new EventEmitter();
  @Output() featcategory = new EventEmitter();

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    sendsms(mob,otp): Observable<any>{

     let smsurl = "https://api.bulksmsgateway.in/sendmessage.php?user=Cartigo&password=Cartigo@1988*&mobile="+mob+"&message=Thank you for Testing our service, Regards BULK SMS Gateway&sender=TESTKK&type=3&template_id=1507161717524942102"

      return this.http.get(smsurl);
    }
    //http://api.bulksmsgateway.in/sendmessage.php?user=Cartigo&password=.......&mobile=........&message=Thank you for Testing our service, Regards BULK SMS Gateway&sender=TESTKK&type=3&template_id=1507161717524942102

    allcategories(): Observable<any>{
        return this.http.get(this.menuurl+"categories");
      }

      allparentcategories(): Observable<any>{
        return this.http.get(this.menuurl+"allcategories");
      }
      subcategories(id): Observable<any>{
        //return this.http.get(this.menuurl+"subcategories");


        let user = new User();
        user.id = id
        //user.password = password;
        return this.http.post(`https://cartigo.in/menus/subcategories`, JSON.stringify(user));
     
      }

      
      categorymenu(): Observable<any>{
        return this.http.get(this.menuurl+"categorymenu");
      }


      primarymenu(): Observable<any>{
        return this.http.get(this.menuurl+"app");
      }


      latestProducts(): Observable<any>{
        return this.http.get(this.menuurl+"latestProducts");
      }

      getfeatures(): Observable<any>{
      //  return this.http.get(this.menuurl+"getfeatures");
      return this.http.get(this.menuurl+"getfeatures").pipe(map(results =>

        {
            console.log(results);
            let resp = new Response(results)
           
            this.pageRefresh.emit(true);
            
            return results;
  
  
  
        }));
      }

      featuredCategoriesSection(): Observable<any>{
       // return this.http.get(this.menuurl+"featuredCategoriesSection");
       return this.http.get(this.menuurl+"featuredCategoriesSection").pipe(map(results =>

        {
            console.log(results);
            let resp = new Response(results)
           
            this.featcategory.emit(true);
            
            return results;
  
  
  
        }));
      }
      //topBrands
      topBrands(): Observable<any>{
        return this.http.get(this.menuurl+"topBrands");
      }

        //appallbrands
        allBrands(): Observable<any>{
          return this.http.get(this.menuurl+"appallbrands");
        }


      getslider(): Observable<any>{
        return this.http.get(this.menuurl+"getslider");
      }

      getsliderRef(): Observable<any>{
        return this.http.get(this.menuurl+"getslider").pipe(map(results =>

          {
              console.log(results);
              let resp = new Response(results)
             
            //  this.pageRefresh.emit(true);
              
              return results;
    
    
    
          }));
      }

      //threeColumnBanners
      threeColumnBanners(): Observable<any>{
        return this.http.get(this.menuurl+"threeColumnBanners");
      }

      WhatsappNumber(): Observable<any>{
        return this.http.get(this.menuurl+"whatsappnum");
      }

      //threeColumnFullWidthBanners

      threeColumnFullWidthBanners(): Observable<any>{
        return this.http.get(this.menuurl+"threeColumnFullWidthBanners");
      }

       //threeColumnBanners
       twoColumnBanners(): Observable<any>{
        return this.http.get(this.menuurl+"twoColumnBanners");
      }


      getCategory(query,brand,category,tag,fromprice,toprice,sort,perpage,page): Observable<any>
      {
        //https://cartigo.in/products?query=&brand=&category=dairy-bakery&tag=&fromPrice=0&toPrice=3050&sort=alphabetic&perPage=30&page=1

        var strurl = "https://cartigo.in/products?query="+query+"&brand="+brand+"&category="+category+"&tag="+tag+"&fromPrice="+fromprice+"&toPrice="+toprice +"&sort="+sort+"&perPage="+perpage+"&page="+page
        return this.http.get(strurl);
      }

//Request URL: https://cartigo.in/products?query=&brand=godrej&category=&tag=&fromPrice=0&toPrice=5153&sort=latest&perPage=30&page=2


      getfeaturedProd()
      {
       // https://cartigo.in/storefront/featured-categories/4/products

       return this.http.get('https://cartigo.in/storefront/featured-categories/4/products');
      }


      gettaboneproducts(index): Observable<any>{
        return this.http.get("https://cartigo.in/storefront/tab-products/sections/1/tabs/"+index);
      }


      gettabtwoproducts(index): Observable<any>{
        return this.http.get("https://cartigo.in/storefront/tab-products/sections/2/tabs/"+index);
      }

      ///https://cartigo.in/storefront/product-grid/tabs/2

      getproductgridproducts(index): Observable<any>{
        return this.http.get("https://cartigo.in/menus/product-grid/"+index);


      }
      getproductgrid(): Observable<any>{
        return this.http.get(this.menuurl+"productGrid");
            }
    
     getproductgridCategory(): Observable<any>{
        
          return this.http.get(this.menuurl+"productGridCategory");
       }
            

      getFeatureProducts(index,offset) {

        const obj = {settingPrefix: index, offset: offset};
       // return this.http.get("https://cartigo.in/storefront/vertical-products/"+index);
       return this.http.post(`https://cartigo.in/menus/vertproduct`, JSON.stringify(obj)).pipe(map(results =>

       {
           console.log(results);
          
           return results;
   
   
   
       }));
       // return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    getSearchResult(srch: string) {
      return this.http.get("https://cartigo.in/menus/SearchApp/"+srch);

     // return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

    flashSaleAndVerticalProducts(): Observable<any>{
      return this.http.get(this.menuurl+"flashSaleAndVerticalProducts");
    }

    flashSaleProducts(): Observable<any>{
      return this.http.get("https://cartigo.in/storefront/flash-sale-products");
    }

    getBrands(): Observable<any>{
      return this.http.get(this.menuurl+"appbrands");
    }
    getStates(): Observable<any>{
      return this.http.get("https://cartigo.in/countries/IN/states");
    }


    //https://cartigo.in/countries/IN/states
    
    checkPhoneExist(phone ) {
      let user = new User();
      user.phone = phone
      
      return this.http.post(`https://cartigo.in/checkPhoneExist`, JSON.stringify(user)).pipe(map(results =>
  
      {
          console.log(results);
         
          return results;
  
  
  
      }));
   }
    LoginbyPhone(phone,uuid,refval) {
     // console.log(JSON.stringify(email,password)) ;
      //partner.action = 'register';
      let user = new User();
      user.phone = phone
     user.referal  = refval
      user.uuid = uuid
      return this.http.post(`https://cartigo.in/apploginbyphone`, JSON.stringify(user)).pipe(map(results =>

      {
          console.log(results);
          let resp = new Response(results)
          if(resp.message=="success")
          {
          this.userLogin.emit(true);
          }
          return results;



      }));
   }




    Login(email,password,uuid) {
      console.log(JSON.stringify(email,password)) ;
      //partner.action = 'register';
      let user = new User();
      user.email = email
      user.password = password;
      user.uuid = uuid
      return this.http.post(`https://cartigo.in/applogin`, JSON.stringify(user)).pipe(map(results =>

      {
          console.log(results);
          let resp = new Response(results)
          if(resp.message=="success")
          {
          this.userLogin.emit(true);
          }
          return results;



      }));
   }

   LoginSocial(user:User) {
    console.log(JSON.stringify(user)) ;
    //partner.action = 'register';
   console.log('call')
    return this.http.post(`https://cartigo.in/postSocialRegister`, JSON.stringify(user)).pipe(map(results =>

    {
        console.log('results');
        let resp = new Response(results)
        if(resp.message=="success")
        {
        this.userLogin.emit(true);
        }
        if(resp.message=="user exists")
        {
        this.userLogin.emit(true);
        }
        
        return results;



    }));
 }

   Register(user:User ) {
    console.log(user) ;
    
    return this.http.post(`https://cartigo.in/appregister`, JSON.stringify(user)).pipe(map(results =>

    {
        console.log(results);
       
        return results;



    }));
 }


 ResetPassword(user:User ) {
  console.log(user) ;
  
  return this.http.post(`https://cartigo.in/appresetpassword`, JSON.stringify(user)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  }));
}

 //updateProfile

 updateProfile(user:User ) {
  console.log(user) ;
  
  return this.http.post(`https://cartigo.in/menus/appupdtprofile`, JSON.stringify(user)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  }));
}

addReview(review:Review ,rating,pid) {

  review.pid = pid;
  review.rating = rating;
review.uid = localStorage.getItem('uid');
  console.log(review) ;
  
  return this.http.post(`https://cartigo.in/menus/addreview`, JSON.stringify(review)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  }));
}


saveAddress(address:Address,addressid ) {
  
  address.uid = localStorage.getItem('uid');
  address.addressid = addressid;
  console.log(address) ;
   return this.http.post(`https://cartigo.in/menus/saveAddress`, JSON.stringify(address)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  })); 
}

//updateDefAddress


updateDefAddress(addressid ) {
  
  let address = new Address();
  address.addressid = addressid;
  address.uid = localStorage.getItem('uid');
  console.log(address) ;
   return this.http.post(`https://cartigo.in/menus/updateDefAddress`, JSON.stringify(address)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  })); 
}

deleteAddress(addressid ) {
  
  let address = new Address();
  address.addressid = addressid;
  address.uid = localStorage.getItem('uid');
  console.log(address) ;
   return this.http.post(`https://cartigo.in/menus/deleteAddress`, JSON.stringify(address)).pipe(map(results =>

  {
      console.log(results);
     
      return results;



  })); 
}



   RecentOrders(id) {
    console.log(JSON.stringify(id)) ;
    //partner.action = 'register';
    let user = new User();
    user.id = id
    //user.password = password;
    return this.http.post(`https://cartigo.in/menus/apprecentorders`, JSON.stringify(user));
 }



 Wishlist(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appwishlist`, JSON.stringify(user));
}



getProdReviews(pid) {
 // console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let review = new Review();
  review.pid = pid
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/getprodreviews`, JSON.stringify(review));
}

getReviews(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appreviews`, JSON.stringify(user));
}
//getOrders


getOrders(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/apporders`, JSON.stringify(user));
}



getDownloads(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/adddownloads`, JSON.stringify(user));
}


getAddresses(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appaddress`, JSON.stringify(user));
}


getProfile(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appprofile`, JSON.stringify(user));
}


getUserCoupon(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appusercoupon`, JSON.stringify(user));
}


getOrderDetail(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/apporderdet`, JSON.stringify(user));
}



CancelOrderDetail(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/cancelorderdet`, JSON.stringify(user));
}


getProductDetail(slug) {
  
  //partner.action = 'register';
  let prod = new Product();
  prod.slug = slug
  
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appproductdet`, JSON.stringify(prod));
}

getProductPrice(id,optid,pid)
{
  let prod = new Product();
  prod.id = id
  prod.optid = optid
  prod.slug = pid
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appproductprice`, JSON.stringify(prod));

}

removeCartItem(cartid,cartprodid)
{
  let cart = new Cart()
  cart.cartid = cartid;
  cart.cartprodid = cartprodid
  console.log(cartid)
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/removeCartItem`, JSON.stringify(cart));

}

addtoCart(id,optid,pid,qty,amt,disct,promo,cartid)
{
  let prod = new Product();
  prod.id = id
  prod.optid = optid
  prod.slug = pid
  prod.qty = qty
  prod.uid = localStorage.getItem("uid")
  prod.amt = amt;
  prod.disct = disct;
  prod.promo = promo;
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/addtoCart`, JSON.stringify(prod));

}

UpdateUserCart(qty,cartid,cartprodid)
{
  let prod = new Cart();
  
  prod.qty = qty
  
  prod.cartprodid = cartprodid;
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/UpdateUserCart`, JSON.stringify(prod));


}
addCoupon(code,cartid)
{
  let prod = new Cart();
  
  prod.promo  = code;
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/addCoupon`, JSON.stringify(prod));

}

addRefCoupon(code,cartid)
{
  let prod = new Cart();
  
  prod.promo  = code;
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/addRefCoupon`, JSON.stringify(prod));

}



removeCouponReq(code,cartid)
{
  let prod = new Cart();
  
  prod.promo  = code;
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/removeCouponReq`, JSON.stringify(prod));

}


getUserCheckout(cartid)
{
  let prod = new Cart();
  
  prod.id = localStorage.getItem("uid")
  prod.cartid = cartid;
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/getUserCheckout`, JSON.stringify(prod));

}


getUserCart() {
 
  //partner.action = 'register';
  let user = new User();
  
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  //return this.http.post(`https://cartigo.in/menus/getUserCart`, JSON.stringify(user));

  return this.http.post(`https://cartigo.in/menus/getUserCart`, JSON.stringify(user)).pipe(map(results =>

  {
     // console.log(results);
      let resp = new Response(results)
      
      this.userCart.emit(results);

      return results;



  }));

}

addOrder(order:Order)
{
  return this.http.post(`https://cartigo.in/menus/addOrder`, JSON.stringify(order));

}


getWushlist() {
 
  //partner.action = 'register';
  let user = new User();
  
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appwishlist`, JSON.stringify(user));
}
//appwishlistprod

getWushlistProd(pid) {
 
  //partner.action = 'register';
  let user = new User();
  
  user.uid = localStorage.getItem("uid")
  user.id = pid
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appwishlistprod`, JSON.stringify(user));
}

addWishlist(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appaddwishlist`, JSON.stringify(user));
}


remWishlist(id) {
  console.log(JSON.stringify(id)) ;
  //partner.action = 'register';
  let user = new User();
  user.id = id
  user.uid = localStorage.getItem("uid")
  //user.password = password;
  return this.http.post(`https://cartigo.in/menus/appremwishlist`, JSON.stringify(user));
}


}
