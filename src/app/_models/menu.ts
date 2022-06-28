export class Menu {

    menu_id: string;
    name: string;
    slug: string;
    target: string;
    url: string;
    bgimage: string;
    icon: string;
    hasSubMenus: string;
    author: string;

    constructor(data:any)
    {
       if(data){
       // this.course_id = data.id;
        this.name = data.name;
        this.hasSubMenus = data.hasSubMenus;
        this.icon = data.icon;
        this.target = data.target;
        this.url = data.url;
      
       }
    }

}
