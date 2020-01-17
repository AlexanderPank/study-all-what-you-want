import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../_services/categorys.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {
  categoryId : -1;
  categoryTitle : string;
  constructor( private serviceCategories:CategoryService,
               private router: Router,
               private aRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log("ItemListComponent ")
    this.aRoute.params.subscribe( (params: Params) => {
        this.categoryId = params['categoryId'];
        this.categoryTitle = this.serviceCategories.getCategoryById(this.categoryId).title;
        console.log("ItemListComponent ", params)
      }
    )
  }



  addNewItem(){
    this.router.navigate([`items/${this.categoryId}/add/0`])
  }


}
