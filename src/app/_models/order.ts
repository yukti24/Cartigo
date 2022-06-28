
export class Order {

    uid:string;
    cartid:string;
    email:string;
    phone:any;
    customer_first_name:any;
    customer_last_name :any ='';
    billing_address_id:any='';
    billing_first_name:any ='';
    billing_last_name=""
    billing_address_1=''
    billing_address_2=''
    billing_city=''
    billing_zip='';
    billing_state='';
    billing_country='';
    billing_phone=''
    

    shippingAddressId:any='';
    shipping_first_name:any ='';
    shipping_last_name=""
    shipping_address_1=''
    shipping_address_2=''
    shipping_city=''
    shipping_zip='';
    shipping_state='';
    shipping_country='';
    shipping_phone=''
    sub_total=0;
    shipping_method=''
    shipping_cost=''
    coupon_id='';
    discount=0
    total =0;
    payment_method='';
    order_note=''

}
