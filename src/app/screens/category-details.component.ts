import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DefinitionsService} from '../_services/definitions.service';
import {LongPressDirective} from '../_directives/long-press.directive';
import {Category} from '../_models/category';
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
  constructor(private serviceDefinition:DefinitionsService,
              private router: Router) {

  }

  ngOnInit() {
  }

  onClick(id:number){
    this.router.navigate(['exam/'+id]);
  }

  enterInEditMode(event:Event, id:number){
    this.router.navigate(['category/view/'+id])
  }

}
