import {cart,removeCartItem,updateDeliveryOption} from '../../data/cart.js';
import {products,getProductByCartId} from '../../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOptionByCart } from '../../data/deliveryOptions.js';
import { rerunPaymentSummary } from './paymentSummary.js';
export function rerunOrderSummary(){
  let checkoutHtml = '';
  cart.forEach((cartItem)=>{
  let matchingProduct=getProductByCartId(cartItem);
  const matchingDate = getDeliveryOptionByCart(cartItem);
  let today = dayjs();
  let day = today.add(matchingDate.day,'day');
  day = day.format('dddd , MMMM D');
    checkoutHtml+=` <div class="cart-item-container" id="${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${day}
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
                    ${deliveryDate(matchingProduct,cartItem)}

                    </div>
                  </div>
                </div>
              </div>
            </div>`
            document.querySelector('.js-order-summary').innerHTML = checkoutHtml;

  })
  function deliveryDate(matchingProduct,cartItem){
  let today = dayjs();
  let deliveryOptionsHtml = '';
  deliveryOptions.forEach((deliveryOption,index)=>{
  const check = cartItem.deliveryOptionId === deliveryOption.id;
  let day = today.add(deliveryOption.day,'day');
  day = day.format('dddd , MMMM D');
  const cost = deliveryOption.cost /100;
  deliveryOptionsHtml+=`
  <div class="delivery-option js-delivery-option"data-matching-product-id=${matchingProduct.id} data-delivery-option-id=${deliveryOption.id}>
        <input type="radio" 
          class="delivery-option-input" ${check ? 'checked' :''}
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
    rerunPaymentSummary();
  })
  });
  document.querySelectorAll('.js-delivery-option').forEach((option)=>{
    option.addEventListener('click',()=>{
      const deliveryOption = option.dataset.deliveryOptionId;
      const cartItem = option.dataset.matchingProductId;
      updateDeliveryOption(cartItem,deliveryOption);
      rerunOrderSummary();
      rerunPaymentSummary();
    })
  })
}
