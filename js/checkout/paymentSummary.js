import {cart} from '../../data/cart.js'
import { getDeliveryOptionByCart } from '../../data/deliveryOptions.js';
import { getProductByCartId,twoDigits } from '../../data/products.js';
import {loadPage} from '../orders.js'
export function rerunPaymentSummary(){
  if(cart.length===0){
    document.querySelector('.js-payment-summary').innerHTML = '<div>No products in the cart</div>';
  }
  else{
  let itemsCost=0;
  let deliveryFees = 0;
  let quantity = 0;
  cart.forEach((cartItem)=>{
    const matchingProduct = getProductByCartId(cartItem);
    itemsCost+=matchingProduct.priceCents * cartItem.quantity;
    quantity +=Number(cartItem.quantity);
    const deliveryOption = getDeliveryOptionByCart(cartItem);
    deliveryFees+= deliveryOption.cost;
     })
     const totalBeforeTax = itemsCost + deliveryFees;
     const tax =totalBeforeTax / 10;
     const totalGross = totalBeforeTax+tax;
     localStorage.setItem('total',JSON.stringify(totalGross));
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
           <button class="place-order-button button-primary js-place-order">
            Place your order

          </button>
     `
     document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;
     document.querySelector('.js-place-order').addEventListener('click', async()=>{
      localStorage.setItem('gate','1');
     window.location.href = 'orders.html'
    });
    }
  }
    
    
