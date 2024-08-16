export const cart = [];
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
}