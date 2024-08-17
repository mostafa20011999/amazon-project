import {cart,removeCartItem} from '../data/cart.js';
import {products} from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
let checkoutHtml = '';
let totalQuantity = 0;
let totalCost = 0;
cart.forEach((cartItem)=>{
  let matchingProduct;
  products.forEach((product)=>{
    if(product.id === cartItem.productId){
      matchingProduct=product;
    } 
  })
  totalQuantity += cartItem.quantity;
  totalCost +=cartItem.quantity * matchingProduct.priceCents;
  checkoutHtml+=` <div class="cart-item-container" id="${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                ${matchingProduct.price}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-quantity" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                  ${deliveryDate(matchingProduct)}

                  </div>
                </div>
              </div>
            </div>
          </div>`
          document.querySelector('.js-order-summary').innerHTML = checkoutHtml;

})
function deliveryDate(matchingProduct){
let today = dayjs();
let deliveryOptionsHtml = '';
deliveryOptions.forEach((deliveryOption,index)=>{
let day = today.add(deliveryOption.day,'day');
day = day.format('dddd , MMMM D');
const cost = deliveryOption.cost /100;
deliveryOptionsHtml+=`
<div class="delivery-option">
      <input type="radio" 
        class="delivery-option-input"
        name="${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${day}
        </div>
        <div class="delivery-option-price">
          ${deliveryOption.cost === 0? 'FREE shipping' : `$ ${cost} -shipping`}
        </div>
      </div>
    </div>
    `

})
return deliveryOptionsHtml;
}
document.querySelectorAll('.js-delete-quantity').forEach((deleteButton)=>{
  deleteButton.addEventListener('click',()=>{
  const productId = deleteButton.dataset.productId;
  removeCartItem(productId);
})
});

