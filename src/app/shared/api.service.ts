import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http:HttpClient) { }

  // now used get post delete in service section.......

// create product using post method..
postProduct(data:any){
  return this._http.post<any>("http://localhost:3000/posts",data).pipe(map((res:any)=>{
   return res;
  }))
}

// now get data ...

getProduct(){
  return this._http.get<any>("http://localhost:3000/posts").pipe(map((res:any)=>{
    return res;
  }))
}


// now update

updateProduct(data:any,id:number){
  return this._http.put<any>("http://localhost:3000/posts/"+id ,data).pipe(map((res:any)=>{
    return res;
  }))
}

deleteProduct(id:number){
  return this._http.delete<any>("http://localhost:3000/posts/"+id).pipe(map((res:any)=>{
    return res;
  }))
}
}
