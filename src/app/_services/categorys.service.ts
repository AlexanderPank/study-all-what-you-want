import {Injectable, OnChanges, OnDestroy} from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';

import {Category} from '../_models/category';
import {AuthService} from "./auth.service";
import {Definition} from "../_models/definition";



@Injectable()
export class CategoryService {


  isLoadingData = false
  isDoingSynchronize = false;
  public isNetWorkConnection = true;
  public listOfCategory = new Array<Category>();

  constructor(private http:HttpClient,
              private user: AuthService){
    // загружаем локальное хранилище
    let arrayLocal = JSON.parse(localStorage.getItem("categoryList"));
    if (arrayLocal!=undefined && arrayLocal!=null) this.listOfCategory = arrayLocal;

    // загружаем удаленное хранилище
    if (this.isNetWorkConnection)
        this.loadCategoryFromServer();
  }

  loadCategoryFromServer( ){
    this.isLoadingData = true;
    var arr = new Array<Category>();
    this.http.get<Category[]>(
      'http://localhost:4000/categories/'
    ).subscribe(
      (resp) => {
        console.log("got data from Server" ,resp);
        this.isLoadingData = false;
        if (this.getLastUpdateTime(this.listOfCategory) >= this.getLastUpdateTime(resp)) {
          console.log("Use local data");
          if (this.isNetWorkConnection) this.synchronize();
        } else {
          console.log("Use data from server");
          this.listOfCategory = resp;
          this.wasChanges(null);
        }
      }
    );

    console.log("arr=" ,arr)
    return arr;

  }

  // загружаем данные на сервер
  synchronize(){
    this.isDoingSynchronize = true;

    console.log("Starting synchronize.");
    this.http.put(
      'http://localhost:4000/categories/synchronize',
          this.listOfCategory
    ).subscribe(
      (resp) => console.log(resp),
      (err) => console.log("Error: " + err),
      () => console.log("complete " )

    )
    console.log("Ending synchronize.");
    this.isDoingSynchronize = false;
  }

  // получаем последнее изменение происходившее в категориях
  getLastUpdateTime(list1: Array<Category>){

    if (list1==null || !Array.isArray(list1) || list1.length<=0 ) return 0;

    let element = list1.reduce(function (prev, current) {
      return (prev.lastTimeUpdated > current.lastTimeUpdated) ? prev : current
    });

    if (element!=null) return (new Date(element.lastTimeUpdated)).getTime();
    else  return 0;
  }

  onChanges(): void {

    localStorage.setItem("categoryList", JSON.stringify(this.listOfCategory))
    console.log("changed")
  }


  setSelected(id:number, selected:boolean){
    console.log('setSelected');
    this.listOfCategory.forEach( x => x.isSelected =false);
    let el = this.listOfCategory.find( x=>x.id == id);
    el.isSelected = selected;
    console.log(this.listOfCategory.find( x=>x.id == id).isSelected)
  }

  isSelected(id:number){
    let el = this.listOfCategory.find( x=>x.id == id);

    if (el != null && el != undefined) return el.isSelected;
    console.log('isSelected ' + el)
    return  false;
  }

  getSelectedCategory(){
    let el = this.listOfCategory.find( x=>x.isSelected);
    if (el != null && el != undefined) return el.id;
    return -1;
  }

  wasChanges(category:Category){
    if (category!=null)
      category.lastTimeUpdated = new Date( Date.now() );
    //TODO: update date on the server if connection exists
    localStorage.setItem("categoryList", JSON.stringify(this.listOfCategory))
  }


  onDelete(id:number){



  }

  addTodo(element:Category){

  }

  getDefinition(categoryId:number, id:number){
     var category : Category;
     if ((category = this.getCategoryById(categoryId))==null) return null;
     return category.Items.find( x => x.id == id);
  }

  addDefinition(categoryId:number, def:Definition){
    var category : Category  = this.getCategoryById(categoryId);
    if (category==null) return false;

    def.category_id = categoryId;
    def.id = this.getMaxDefinitionId(category.Items);
    if (this.isNull(category.Items))
      category.Items = new Array<Definition>();

    category.Items.push(def);

    console.log('category',JSON.stringify(this.listOfCategory, null, 2))
    this.wasChanges(category);

    return true;
  }

  updateDefinition(categoryId:number, def:Definition){
    var category : Category  = this.getCategoryById(categoryId);
    if (category==null || category.Items==null || category.Items.length==0) return false;

    let localDef:Definition = category.Items.find( x=> x.id == def.id);

    if (localDef == null) return  false;

    localDef.name = def.name;
    localDef.value = def.value;

    this.wasChanges(category);
    console.log( "updateDefinition ", JSON.stringify(category) );

    return true;
  }

  deleteDefinition(categoryId: number, def: Definition) {
    var category: Category = this.getCategoryById(categoryId);
    if (category == null || category.Items == null || category.Items.length == 0) return false;

    let localDef: Definition = category.Items.find(x => x.id == def.id);
    if (localDef == null) return false;

    category.Items = category.Items.filter( x=> x.id !=def.id);
    this.wasChanges(category);
    console.log("deleteDefinition ", JSON.stringify(category));
    return true;
  }


  private isNull(element:any){
    if (element==undefined || element ==null) return true;
    return false;
  }
  private  getMaxDefinitionId(Items:Array<Definition>){

    if ( this.isNull(Items) || Items.length<=0) return  1;

    let element =  Items.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    });

    console.log(Items,element);

    return (element != undefined) ? element.id + 1 : 1;
  }


  getItemList(id:number){
    let elem = this.listOfCategory.find( x => x.id == id)
    if (elem == undefined || elem.Items == undefined) return []

    return elem.Items;
  }

  createEmptyItem(){ return new Category(); }
  createEmptyDefinition(categoryId){ return new Definition(categoryId); }

  public  getCategoryById(id:number){
    let element = this.listOfCategory.find( x => x.id == id)
    return element;
  }

  private  getMaxCategoryId(){

    if (this.listOfCategory.length<=0) return  1;
    let element =  this.listOfCategory.reduce(function (prev, current) {
      return (prev.id > current.id) ? prev : current
    });

    return (element != undefined) ? element.id + 1 : 1;
  }

  addCategory(category:Category):number {
    category.id = this.getMaxCategoryId();

    this.listOfCategory.push(category)
    this.wasChanges(this.listOfCategory.find(x=>x.id == category.id));
    return category.id
  }

  updateCategory(category:Category): any {
    console.log("Category="+JSON.stringify(category));

    let element = this.listOfCategory.find( x=> x.id ==category.id)
    if (!element) return  'Ошибка: невозможно найти выбранную категорию';
    const i = this.listOfCategory.indexOf(element);
    if (i<0) return  'Ошибка: невозможно определить индекс категории';

    this.listOfCategory[i].title = category.title;
    this.listOfCategory[i].description = category.description;
    this.wasChanges(this.listOfCategory[i]);
    console.log(JSON.stringify(this.listOfCategory[i]));
    return  category.id;
  }

  deleteCategory(category:Category){
    this.listOfCategory = this.listOfCategory.filter( x => x.id !=category.id)
    this.wasChanges(null);
    return category.id;
  }



}
