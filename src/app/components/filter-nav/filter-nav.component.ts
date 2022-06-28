import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { FilterNavDirection } from './filter-nav-direction';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter-nav',
  templateUrl: './filter-nav.component.html',
  styleUrls: ['./filter-nav.component.scss']
})
export class FilterNavComponent implements OnInit {

  showFilter: Observable<boolean>;

  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: FilterNavDirection = FilterNavDirection.Left;
  
  constructor(private filterService: FilterService){}

  ngOnInit(): void {
    this.showFilter = this.filterService.getShowFilter();
  }

  onSidebarClose() {
    this.filterService.setShowFilter(false);
  }

  getSideFilterStyle(showNav: boolean) {
    let navBarStyle: any = {};
    
    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';
    
    return navBarStyle;
  }
}
