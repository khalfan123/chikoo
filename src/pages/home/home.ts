import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  products: any[];
  constructor(public navCtrl: NavController) {

    this.WooCommerce = WC({
    
      url: 'http://localhost', // Your store URL
      consumerKey: 'ck_8b45648647e2c1c8e5411d8674b4e88f7708842c', // Your consumer key
      consumerSecret: 'cs_0e2023161c545ea747f5a7e8751bfad6acd71f40', // Your consumer secret
      wpAPI: true, // Enable the WP REST API integration
      version: 'wc/v3', // WooCommerce WP REST API version
      
    });

      this.WooCommerce.getAsync("products").then ( 
      (data) => { 
       this.products=JSON.parse(data.body);
       console.log(this.products);
      }, 
      (err) => { console.log(err); } ); 


  }

}
