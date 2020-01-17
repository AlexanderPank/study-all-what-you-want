import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LongPressDirective} from '../_directives/long-press.directive';
import {Category} from '../_models/category';
import {isArray} from 'util';
import {CategoryService} from '../_services/categorys.service';
@Component({
  selector: 'app-card',
  templateUrl: 'category-details.component.html',
  styles: ['']
})
export class CategoryDetailsComponent implements OnInit {

  @Input() category :  Category;
  @Input() showInMainPage :  Category;

  @Output() mLongPress :  EventEmitter<any>;

  @Input()  editCategoriesList = false
  isShowDetail  = false;
  constructor(private serviceCategories:CategoryService,
              private router: Router) {
    console.log("CategoryDetailsComponent " + serviceCategories.isSelected(1));
  }

  ngOnInit() {
  }

  goToExame(id:number){
    this.router.navigate(['exam',id]);
  }

  enterInEditMode(event:Event, id:number){
    this.router.navigate(['category','edit',id])
  }

  getCountItems(){
    if (isArray(this.category.Items)) return  this.category.Items.length;
    else  return 0;
  }

  getExemInfo():string{

    if (!isArray( this.category.Items)) return "0 / 0 / 0 [0]";
    let allCount = this.category.Items.length;
    return "(0 / 0 / 0) " + allCount ;
  }

  showDetail(id:number){
    this.serviceCategories.setSelected(id, true);
    this.isShowDetail = !this.isShowDetail;
  }
}
/***
 <1
 <10
 <24
 <36
 <108
 <300

 ***/
