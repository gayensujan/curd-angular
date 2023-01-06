import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { productdata } from './navbar.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

formvalue!:FormGroup
productModelObj:productdata=new productdata;
allproductdata: any
showAdd!:boolean
showbtn!:boolean;
  constructor(private formbuilder:FormBuilder,private api:ApiService){}

  ngOnInit(): void {

// form grouping ke liye lifecircle use kiya

this.formvalue= this.formbuilder.group({
  name:[''],
  price:[''],
  address:[''],
  contact:['']
})
this.getAllData()
  }

  clickaddproduct(){
    this.formvalue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
  // now subcribe our data which are mapped

  addprod(){
    this.productModelObj.name=this.formvalue.value.name;
    this.productModelObj.price=this.formvalue.value.price;
    this.productModelObj.address=this.formvalue.value.address;
    this.productModelObj.contact=this.formvalue.value.contact;

    this.api.postProduct(this.productModelObj).subscribe(res=>{
      console.log(res);
      alert("Product added sucessful");

      let ref= document.getElementById('clear');
      ref?.click();
      this.formvalue.reset()
      this.getAllData();
    })
  }






// get all data display same page

getAllData(){
  this.api.getProduct().subscribe(res=>{
    this.allproductdata = res;
  })
}
 // delete data .......
 deleteproduct(data:any){
  this.api.deleteProduct(data.id).subscribe(res=>{
    console.log("Product data deleted ");
    this.getAllData();
  })
}


oneditproduct(data:any){
  this.showAdd=false;
  this.showbtn=true;
  this.productModelObj.id=data.id
  this.formvalue.controls['name'].setValue(data.name);
  this.formvalue.controls['price'].setValue(data.price);
  this.formvalue.controls['address'].setValue(data.address);
  this.formvalue.controls['contact'].setValue(data.contact);
}
updatepro(){

  this.productModelObj.name=this.formvalue.value.name;
  this.productModelObj.price=this.formvalue.value.price;
  this.productModelObj.address=this.formvalue.value.address;
  this.productModelObj.contact=this.formvalue.value.contact;

  this.api.updateProduct(this.productModelObj,this.productModelObj.id).subscribe(res=>{
    console.log("Product update Sucessfull");
    let ref= document.getElementById('clear');
    ref?.click();
    this.formvalue.reset()
    this.getAllData();
  })
}
}
