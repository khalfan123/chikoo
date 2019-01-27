import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import * as WC from 'woocommerce-api';
import { ProductsByCategoryPage } from "../products-by-category/products-by-category";

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  homePage: typeof HomePage;
  WooCommerce: any;
  categories: any[];

  // Fixing - using view child 
  @ViewChild('content') childNavCtrl: NavController;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.homePage=HomePage;
    this.categories = [];

    this.WooCommerce = WC({
    
      url: 'http://localhost', // Your store URL
      consumerKey: 'ck_8b45648647e2c1c8e5411d8674b4e88f7708842c', // Your consumer key
      consumerSecret: 'cs_0e2023161c545ea747f5a7e8751bfad6acd71f40', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3', // WooCommerce WP REST API version
      
    });

    // Fetch the products from WooCommerce store
    this.WooCommerce.getAsync("products/categories").then ( 
    (data) => { 

      //Declaring local variable to get the list of categories.
      let temp: any [] = JSON.parse(data.body);
      for (let i = 0; i < temp.length; i++) {
        if (temp[i].parent == 0) {
          if (temp[i].slug == "vegetables") {
            temp[i].icon = "pizza";
          }
          if (temp[i].slug == "fruits") {
            temp[i].icon = "leaf";
          }
          if (temp[i].slug == "generalproducts") {
            temp[i].icon = "basket";
          }
          this.categories.push(temp[i]);
        }
        
        
      }
      
    }, 
    (err) => { console.log(err); } ); 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

   // This function to open the category page
   openCategoryPage(category){
    this.childNavCtrl.setRoot(ProductsByCategoryPage, { "category": category  })
  }

}
