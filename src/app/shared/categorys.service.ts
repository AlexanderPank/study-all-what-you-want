import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Category{
  id:number
  title: string
  description: string
  date?: any
  countElement:number
}

@Injectable({providedIn:'root'})
export class CategoryService {


  public listOfCategory: Category[];

  constructor(private http:HttpClient){}

  fetchCategoryList(): Observable<Category[]>
  {
    /* return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap(todos=> this.todosArray = todos)) */
    let listCat: Category[] = [] ;

    let  element: Category =   {id:1,title: 'Category 0', description: 'First category', date: new Date(), countElement: 5 }; listCat.push(element);
                    element =  {id:2,title: 'Category 1', description: 'First category', date: new Date(), countElement: 5 }; listCat.push(element);
                    element =  {id:3,title: 'Category 2', description: 'First category', date: new Date(), countElement: 5 }; listCat.push(element);
                    element =  {id:4,title: 'Category 3', description: 'First category', date: new Date(), countElement: 5 }; listCat.push(element);
    this.listOfCategory = listCat;
    return  of(listCat)  ;

  }



  onCahngeChecked(id:number){

  }


  onDelete(id:number){



  }

  addTodo(element:Category){

  }



}
