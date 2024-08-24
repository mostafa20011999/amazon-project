import { rerunOrderSummary } from "./checkout/orderSummary.js";
import {rerunPaymentSummary} from './checkout/paymentSummary.js'
import { genProductsFetch } from "../data/products.js";
async function loadPage(){
  await genProductsFetch();
  rerunOrderSummary();
  rerunPaymentSummary();
}
loadPage();
/*Promise.all([
  genProductsFetch()
]).then(()=>{
  rerunOrderSummary();
  rerunPaymentSummary();
})*/

/*Promise.all([
  new Promise((resolve)=>{
  genProducts(()=>{
    resolve();
  })})]).then(()=>{
  rerunOrderSummary();
  rerunPaymentSummary();
})*/
