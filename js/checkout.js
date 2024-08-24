import { rerunOrderSummary } from "./checkout/orderSummary.js";
import {rerunPaymentSummary} from './checkout/paymentSummary.js'
import { genProducts } from "../data/products.js";
Promise.all([
  new Promise((resolve)=>{
  genProducts(()=>{
    resolve();
  })})]).then(()=>{
  rerunOrderSummary();
  rerunPaymentSummary();
})
