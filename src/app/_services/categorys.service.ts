import {Injectable, OnChanges, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {Category} from '../_models/category';
import {isUndefined} from 'util';

@Injectable()
export class CategoryService {

  private lastTimeUpdate:number;

  public listOfCategory = new Array<Category>();

  constructor(private http:HttpClient){
    let arr = JSON.parse(localStorage.getItem("categoryList"));
    if (isUndefined(arr) || arr == null)
      this.fetchCategoryList();
    else
      this.listOfCategory = arr;
  }


  onChanges(): void {

    localStorage.setItem("categoryList", JSON.stringify(this.listOfCategory))
    console.log("changed")
  }

  fetchCategoryList(): Observable<Category[]>
  {
    console.log("storage not found")
    /* return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap(todos=> this.todosArray = todos)) */


    let  element: Category =   {id:1,title: 'Category 0', description: 'First category', date: new Date(), countElement: 35 }; this.listOfCategory.push(element);
                    element =  {id:2,title: 'Категория 1', description: 'First category', date: new Date(), countElement: 444 }; this.listOfCategory.push(element);
                    element =  {id:3,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:4,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:5,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:6,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:7,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:8,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:9,title: 'Category 2', description: 'Тест описания категории Тест описания категории Тест описания категории Тест описания категории Тест описания категории ', date: new Date(), countElement: 689 }; this.listOfCategory.push(element);
                    element =  {id:10,title: 'Category 3', description: 'First category', date: new Date(), countElement: 7 }; this.listOfCategory.push(element);

    return  of(this.listOfCategory)  ;

  }



  wasChanges(){
    localStorage.setItem("categoryList", JSON.stringify(this.listOfCategory))
  }


  onDelete(id:number){



  }

  addTodo(element:Category){

  }

  createEmptyItem(){ return new Category(); }

  public  getItem(id:number){
    let element = this.listOfCategory.find( x => x.id == id)
    return element;
  }

  private  getMaxId(){

    if (this.listOfCategory.length<=0) return  1;
    let element =  this.listOfCategory.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    });
    let maxVal = 1;
    if (element != undefined)  maxVal = element.id + 1;

    return maxVal;
  }

  addItem(category:Category):number {
    category.id = this.getMaxId();
    this.listOfCategory.push(category)
    this.lastTimeUpdate = Date.now();
    this.wasChanges();
    return category.id
  }

  updateItem(category:Category): any {
    console.log("Category="+JSON.stringify(Category));

    let element = this.listOfCategory.find( x=> x.id ==category.id)
    if (!element) return  'Ошибка: невозможно найти выбранную категорию';
    const i = this.listOfCategory.indexOf(element);
    if (i<0) return  'Ошибка: невозможно определить индекс категории';

    this.listOfCategory[i].title = category.title;
    this.listOfCategory[i].description = category.description;
    this.wasChanges();
    console.log(JSON.stringify(this.listOfCategory[i]));
    return  category.id;
  }

  deleteItem(category:Category){
    this.listOfCategory = this.listOfCategory.filter( x => x.id !=category.id)
    this.wasChanges();
    return category.id;
  }



}
