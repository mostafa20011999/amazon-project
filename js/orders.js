import { genProductsFetch ,products,getProductByCartId,twoDigits} from "../data/products.js";
import { getDeliveryOptionByCart } from "../data/deliveryOptions.js";
import {cart} from "../data/cart.js"
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
async function loadPage(){
    await genProductsFetch();
    let day = dayjs();
    day = day.format('DD , MMM , YYYY');
    let orderDetails = '';
    console.log(cart);
    cart.forEach((cartItem)=>{
        const product = getProductByCartId(cartItem);
        const deliveryOption = getDeliveryOptionByCart(cartItem);
        let date = dayjs().add(deliveryOption.day,'day');
        date = date.format('dddd DD  MMMM ');
        orderDetails+=`<div class="product-image-container">
        <img src=${product.image}>
        </div>

         <div class="product-details">
        <div class="product-name">
        ${product.name}
        </div>
        <div class="product-delivery-date">
        Arriving on: ${date}
        </div>
        <div class="product-quantity">
        Quantity: ${cartItem.quantity}
        </div>
        <button class="buy-again-button button-primary">
        <img class="buy-again-icon" src="images/icons/buy-again.png">
        <span class="buy-again-message">Buy it again</span>
        </button>
    </div>

    <div class="product-actions">
        <a href="tracking.html">
        <button class="track-package-button button-secondary">
            Track package
        </button>
        </a>
    </div>`
    })
    let totalss = JSON.parse(localStorage.getItem('total'));
    totalss = twoDigits(totalss);
    const ordersHtml = ` <div class="order-container">       
    <div class="order-header">
    <div class="order-header-left-section">
        <div class="order-date">
        <div class="order-header-label">Order Placed:</div>
        <div>${day}</div>
        </div>
        <div class="order-total">
        <div class="order-header-label">Total:</div>
        <div>$${totalss}</div>
        </div>
    </div>

    <div class="order-header-right-section">
        <div class="order-header-label">Order ID:</div>
        <div>27cba69d-4c3d-4098-b42d-ac7fa62b7664</div>
    </div>
    </div>

    <div class="order-details-grid">
    ${orderDetails}

    </div>
    </div> `
    document.querySelector('.js-orders-grid').innerHTML = ordersHtml;
    localStorage.removeItem('cart');
    localStorage.removeItem('cartQuantity');
}
loadPage();

