class Cart {
  cartItems;
  #localKey;
  constructor(key){
    this.#localKey = key;
    this.#loadCart();
  }
  #loadCart(){
    this.cartItems =  JSON.parse(localStorage.getItem(this.#localKey));
    if(!this.cartItems){
      this.cartItems = [{
        productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity :2,
        deliveryOptionId : '1'
      },
    {
      productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity : 1,
      deliveryOptionId : '2'
    }]
    }
    }

      localStore(){
        localStorage.setItem(this.#localKey,JSON.stringify(this.cartItems));
        }

        addCartItem(productId){
          this.cartItems.forEach((item)=>{
        if(item.productId === productId){
          item.quantity++;
          productId='';
        }
          });
          if(productId){
            this.cartItems.push({
              productId,
              quantity : 1
            })
          }
          this.localStore();
         
        
        }

        removeCartItem(productId){
          document.getElementById(`${productId}`).remove();
          const newCart = [];
          this.cartItems.forEach((product)=>{
            if(product.productId!==productId){
              newCart.push({
                productId: product.productId,
                quantity: product.quantity,
                deliveryOptionId: product.deliveryOptionId 
              })
            }
          })
          this.cartItems = newCart;
          this.localStore();
        }

        updateDeliveryOption(cartItemId,deliveryOptionID)
      {
      let cartItem;
      this.cartItems.forEach((item)=>{
      if(cartItemId ===item.productId){
        cartItem = item;
      }
      })
      cartItem.deliveryOptionId =deliveryOptionID;
      this.localStore();
    }
    }
    const cart1 = new Cart('cart-oop');
    const cart2 = new Cart('cart-bus');
    console.log(cart1);
    console.log(cart2);






