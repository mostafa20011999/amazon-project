import { rerunOrderSummary } from "./checkout/orderSummary.js";
import {rerunPaymentSummary} from './checkout/paymentSummary.js'
import { genProducts } from "../data/products.js";
import '../data/backend.js';
genProducts(()=>{
  rerunOrderSummary();
  rerunPaymentSummary();
})
