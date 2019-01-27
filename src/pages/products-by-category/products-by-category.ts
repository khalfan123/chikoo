import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import * as WC from 'woocommerce-api';


/**
 * Generated class for the ProductsByCategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-products-by-category',
  templateUrl: 'products-by-category.html',
})
export class ProductsByCategoryPage {
  WooCommerce: any;
  products: any [];
  page: number;
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController ) {
    this.page = 1;
    this.category = this.navParams.get("category");
    
    this.WooCommerce = WC({
    
      url: 'http://localhost', // Your store URL
      consumerKey: 'ck_8b45648647e2c1c8e5411d8674b4e88f7708842c', // Your consumer key
      consumerSecret: 'cs_0e2023161c545ea747f5a7e8751bfad6acd71f40', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3', // WooCommerce WP REST API version
      
    });


    // Fetch the product from WooCommerce store according to category
    this.WooCommerce.getAsync("products?category=" + this.category.id).then ( 
      (data) => { 
        
       this.products = JSON.parse(data.body);
       
      }, 
      (err) => { console.log(err); } ); 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsByCategoryPage');
  }

    // Loading more products on products by category page  
    
    loadMoreProducts(event) {
      console.log("Entry in load more products function")
      this.page++;
      console.log("Getting page " + this.page);
      this.WooCommerce.getAsync("products?filter[category]=" + this.category.slug + "&page=" + this.page).then((data) => {
        let temp = (JSON.parse(data.body).products);
        console.log(temp);
        this.products = this.products.concat(JSON.parse(data.body).products)
        console.log("Before event competed.!1")
        event.complete();
        console.log("After event competed.!1")
        if (temp.length < 10)
        console.log("Hi there....!!")
          event.enable(false);
          this.toastCtrl.create({
            message: "No more products!",
            duration: 2000
          }).present();
      })
    }

}
