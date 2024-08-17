import {cart, addCartItem} from '../data/cart.js';
import {products} from '../data/products.js';
export let sasa = 2;
let pageHtml = '';
console.log(cart);
products.forEach((item)=>{
  pageHtml+=`<div class="product-container">
  <div class="product-image-container">
    <img class="product-image"
      src="${item.image}">
  </div>

  <div class="product-name limit-text-to-2-lines">
    ${item.name}
  </div>

  <div class="product-rating-container">
    <img class="product-rating-stars"
      src="images/ratings/rating-${item.rating.stars*10}.png">
    <div class="product-rating-count link-primary">
      ${item.rating.count}
    </div>
  </div>

  <div class="product-price">
    $${(item.priceCents/100).toFixed(2)}
  </div>

  <div class="product-quantity-container">
    <select>
      <option selected value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
  </div>

  <div class="product-spacer"></div>

  <div class="added-to-cart">
    <img src="images/icons/checkmark.png">
    Added
  </div>

  <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${item.id}">
    Add to Cart
  </button>
</div>`

})

 function updateCartCounter(){
  cartQuantity++;
  //localStorage.setItem('cartCounter',JSON.stringify(cartQuantity));
  document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
}
document.querySelector(".js-product-grid").innerHTML = pageHtml;
//export let cartQuantity = JSON.parse(localStorage.getItem('cartCounter'));
let cartQuantity = 0;
 document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
document.querySelectorAll(".js-add-to-cart").forEach((button)=>{
 button.addEventListener('click',()=>{
  let productId = button.dataset.productId;
  addCartItem(productId);
  updateCartCounter();
  }
);
});
/*document.querySelectorAll(".js-add-to-cart").forEach((button,index)=>{
  button.addEventListener('click',()=>{
    let i = index ;
    let newItemId = products[i].id;
    cart.forEach((item)=>{
      if(item.productId === newItemId){
        item.quantity++;
        newItemId ='';
      }
    }
  );
   if(newItemId){
    cart.push({
      productId : newItemId,
      quantity : 1
    })
   }
   console.log(cart);
  }
  )
  })*/


