export let cart =  JSON.parse(localStorage.getItem('cart'));
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
      quantity : 1
    })
  }
  localStore();
 

}
export function removeCartItem(productId){
  document.getElementById(`${productId}`).remove();
  const newCart = [];
  cart.forEach((product)=>{
    if(product.productId!==productId){
      newCart.push({
        productId: `${product.productId}`,
        quantity: product.quantity
      })
    }
  })
  cart = newCart;
  localStore();
}
function localStore(){
localStorage.setItem('cart',JSON.stringify(cart));
}