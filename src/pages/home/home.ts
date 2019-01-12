import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import * as WC from 'woocommerce-api';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  WooCommerce: any;
  constructor(public navCtrl: NavController) {

 /*    this.WooCommerce = WC({
      url: "http://localhost/",
      consumerKey: "ck_3a02955f52cb518c82295a8210fef2294091a335",
      consumerSecret: "cs_d903770330afaddcf6e89e9c374fda0f82647513"

    });

    this.WooCommerce.getAsync("products").then ( 
      (data) => { console.log(data) }, 
      (err) => { console.log(err)} ); */


  }

}
