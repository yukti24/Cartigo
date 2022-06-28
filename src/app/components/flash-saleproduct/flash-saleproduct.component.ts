import { Component, OnInit } from '@angular/core';
import { ApiservicesService } from 'src/app/services/apiservices.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-flash-saleproduct',
  templateUrl: './flash-saleproduct.component.html',
  styleUrls: ['./flash-saleproduct.component.scss']
})
export class FlashSaleproductComponent implements OnInit {

  arrProd:any=[];
  image1:string='';
  image2:string='';
  image3:string='';

  daystr:string='';
  hrstr:string='';
  minstr:string='';
  secstr:string='';



  constructor(private apiserv: ApiservicesService,
    private router: Router,) {

      this.apiserv.pageRefresh.subscribe(x=> {
     
        let url = this.router.url;
        if(url === "/home")
       { 
      //  this.flashSaleProducts();
       } 
        
         });

     }

  ngOnInit() {
   this.flashSaleProducts();
  }


  prodDetail(slug)
  {
    this.router.navigate(['/product-detail'], { state: {slug: slug,type:'product'} });

  }

  flashSaleProducts()
  {
    this.apiserv.flashSaleProducts().
    subscribe(
      data2 => {

 this.arrProd = data2;
 console.log(this.arrProd[0].pivot.end_date);
 let countDownDate = new Date(this.arrProd[0].pivot.end_date).getTime();
 console.log(countDownDate)
//[0].pivot.end_date
 let countDownDate1 = new Date("Jan 29, 2022 14:50:25").getTime();
   let that = this;
 // Update the count down every 1 second
 let x = setInterval(function () {

   // Get todays date and time
   let now = new Date().getTime();

   // Find the distance between now and the count down date
   let distance = countDownDate - now;
   // Time calculations for days, hours, minutes and seconds
   let days = Math.floor(distance / (1000 * 60 * 60 * 24));
   let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
   let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   let seconds = Math.floor((distance % (1000 * 60)) / 1000);
   //console.log(now, "now", "countDownDate", countDownDate, "distance", distance, "days", days);
   
      that.daystr = days.toString();
      that.hrstr = hours.toString();
      that.minstr = minutes.toString()
      that.secstr = seconds.toString()
    
   // Output the result in an element with id="demo"
   //document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  //   + minutes + "m " + seconds + "s ";

   // If the count down is over, write some text 
   if (distance < 0) {
     clearInterval(x);
     document.getElementById("demo").innerHTML = "EXPIRED";
   }
 }, 1000);

        //console.log('Data:', this.countryInfo);
      },
      err => console.log(err),
      () => console.log('complete')
    )
  }

}
