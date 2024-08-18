import {cart} from '../../data/cart.js'
import { getDeliveryOptionByCart } from '../../data/deliveryOptions.js';
import { getProductByCartId } from '../../data/products.js';
export function rerunPaymentSummary(){
  let itemsCost=0;
  let deliveryFees = 0;
  cart.forEach((cartItem)=>{
    const matchingProduct = getProductByCartId(cartItem);
    itemsCost+=matchingProduct.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOptionByCart(cartItem);
    deliveryFees+= deliveryOption.cost;
     })
     const totalBeforeTax = itemsCost + deliveryFees;
     const tax =totalBeforeTax / 10;
     let totalGross = totalBeforeTax+tax;
     totalGross /=100;
     totalGross = totalGross.toFixed(2);
     console.log(totalGross);
}