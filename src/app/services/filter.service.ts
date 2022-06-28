import { EventEmitter, Injectable, OnInit,Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private showFilter$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private setFilterHighValue$: BehaviorSubject<string> = new BehaviorSubject<string>('3050');
  private setFilterBrandValue$: BehaviorSubject<string> = new BehaviorSubject<string>('3050');


  @Output() highvaluechange = new EventEmitter();

  @Output() lowvaluechange = new EventEmitter();

  @Output() brandvaluechange = new EventEmitter();


  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.setShowFilter(false);
    });
  }

  ngOnInit() {
  }

  getShowFilter(){
    return this.showFilter$.asObservable();
  }

  setShowFilter(showHide: boolean) {
    //console.log('ghgh')
    this.showFilter$.next(showHide);
  }


  getFilterHighVal(){
    return this.showFilter$.asObservable();
  }

  setFilterHighVal(val: string) {
    //console.log('ghgh')
    this.setFilterHighValue$.next(val);
      this.highvaluechange.emit(val);
  }

  setFilterBrandVal(val: string) {
    //console.log('ghgh')
    this.setFilterBrandValue$.next(val);
      this.brandvaluechange.emit(val);
  }



  getFilterLowVal(){
    return this.showFilter$.asObservable();
  }

  setFilterLowVal(val: string) {
    //console.log('ghgh')
    this.setFilterHighValue$.next(val);
      this.lowvaluechange.emit(val);
  }


  toggleFilterState() {
    this.showFilter$.next(!this.showFilter$.value);
  }

  isFilterOpen() {
    return this.showFilter$.value;
  }


}
