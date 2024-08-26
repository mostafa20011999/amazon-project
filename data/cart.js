export let cart;
export let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 0;
loadCart();
export function loadCart(){
cart =  JSON.parse(localStorage.getItem('cart'))||[];
/*if(!cart){
  cart = [{
    productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity :2,
    deliveryOptionId : '1'
  },
{
  productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity : 1,
  deliveryOptionId : '2'
}]
}*/
}
function localStore(){
  localStorage.setItem('cart',JSON.stringify(cart));
  }
export function addCartItem(productId){
  cart.forEach((item)=>{
if(item.productId === productId){
  item.quantity++;
  productId='';
  
}
  });
  if(productId){
    cart.push({
      productId,
      quantity : 1,
      deliveryOptionId : '1'
    })
  }
  console.log(cart);
  localStore();
 cartQuantity++;
  localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
}
export function removeCartItem(productId){
  document.getElementById(`${productId}`).remove();
  const newCart = [];
  cart.forEach((product)=>{
    if(product.productId!==productId){
      newCart.push({
        productId: product.productId,
        quantity: product.quantity,
        deliveryOptionId: product.deliveryOptionId 
      })
    }
    else{
      cartQuantity-=product.quantity;
      localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
    }
  })
  cart = newCart;
  localStore();
}
export function updateDeliveryOption(cartItemId,deliveryOptionID)
{
  let cartItem;
  cart.forEach((item)=>{
  if(cartItemId ===item.productId){
    cartItem = item;
  }
  })
  cartItem.deliveryOptionId =deliveryOptionID;
  localStore();
}

