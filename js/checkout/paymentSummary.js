import {cart} from '../../data/cart.js'
import { getDeliveryOptionByCart } from '../../data/deliveryOptions.js';
import { getProductByCartId,twoDigits } from '../../data/products.js';
export function rerunPaymentSummary(){
  let itemsCost=0;
  let deliveryFees = 0;
  let quantity = 0;
  cart.forEach((cartItem)=>{
    const matchingProduct = getProductByCartId(cartItem);
    itemsCost+=matchingProduct.priceCents * cartItem.quantity;
    quantity +=cartItem.quantity;
    const deliveryOption = getDeliveryOptionByCart(cartItem);
    deliveryFees+= deliveryOption.cost;
     })
     const totalBeforeTax = itemsCost + deliveryFees;
     const tax =totalBeforeTax / 10;
     const totalGross = totalBeforeTax+tax;
     console.log(totalGross);
     const paymentSummaryHtml = `
     <div class="payment-summary-title">
            Order Summary
          </div>
     <div class="payment-summary-row">
            <div>Items (${quantity}):</div>
            <div class="payment-summary-money">$${twoDigits(itemsCost)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${twoDigits(deliveryFees)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${twoDigits(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${twoDigits(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${twoDigits(totalGross)}</div>
          </div>
           <button class="place-order-button button-primary">
            Place your order

          </button>
     `
     document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
}