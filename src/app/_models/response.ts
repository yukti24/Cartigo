export class Response {
    status:string='';
    message:string=''
id:string='';
referal:string='';
    constructor(data:any)
    {
       if(data){
        this.status = data.status;
        this.message = data.message;
        this.id = data.id;
this.referal = data.referal;
       }
    }
}
