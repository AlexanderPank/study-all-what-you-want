import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LongPressDirective} from '../_directives/long-press.directive';
import {Category} from '../_models/category';
import {Definition} from "../_models/definition";
@Component({
  selector: 'app-definition',
  templateUrl: 'definition-details.component.html',
  styles: ['']
})
export class DefinitionDetailsComponent implements OnInit {

  @Input() definition :  Definition;

  @Input() showInMainPage :  Category;

  @Output() mLongPress :  EventEmitter<any>;

  @Input()  editCategoriesList = false
  isShowDetail  = false;

  countValues:number = 0;
  constructor(private router: Router) {

  }

  ngOnInit() {
    this.countValues = this.definition.value.split("|").length;
  }


}
