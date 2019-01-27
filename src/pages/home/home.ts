import { Component, ViewChild } from '@angular/core';
import { NavController, Slides, ToastController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  moreProducts: any[];
  
  @ViewChild('productSlides') productSlides: Slides;
  page: number;
  
 
  constructor(public navCtrl: NavController, public toastCtrl: ToastController) {
    this.page = 1; //Number of page where you fetching the list of products

    this.WooCommerce = WC({
    
      url: 'http://localhost', // Your store URL
      consumerKey: 'ck_8b45648647e2c1c8e5411d8674b4e88f7708842c', // Your consumer key
      consumerSecret: 'cs_0e2023161c545ea747f5a7e8751bfad6acd71f40', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3', // WooCommerce WP REST API version
      
    });

    
      // Fetch the products from WooCommerce store
      this.WooCommerce.getAsync("products").then ( 
      (data) => { 
       this.products=JSON.parse(data.body);
      }, 
      (err) => { console.log(err); } ); 

      // loading moreProduts method in constructor 
      //to list the product on home page
      this.loadMoreProducts(null);

  }

 // Adding ionViewDidLoad method for sliding products on home page  
  ionViewDidLoad(){

    setInterval(()=>{
      
      if (this.productSlides.getActiveIndex() == this.productSlides.length() -1){
        this.productSlides.slideTo(0);
      }
      else{
        this.productSlides.slideNext();
      }  
      
    },3000);

  }

    // Loading more products on home page  
  loadMoreProducts(event){
    if (event == null) {
      this.page = 1;
      this.moreProducts = [];
      
    } else {
      this.page ++;
          
    }

    this.WooCommerce.getAsync("products?page="+this.page).then ( 
      (data) => { 
       this.moreProducts=this.moreProducts.concat(JSON.parse(data.body));
            
       
       
       if (event != null ) {
       
         event.complete();
         
       }
       //Limit to view the products on home page
       if (JSON.parse(data.body).length < 10) {
         event.enable(false);

         this.toastCtrl.create({
           message: "No more products!",
           duration: 2000
         }).present();
       }
      }, 
      (err) => { console.log(err); } ); 
  }

}
