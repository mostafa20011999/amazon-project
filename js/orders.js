import { genProductsFetch ,products} from "../data/products.js";
import {cart} from "../data/cart.js"
async function loadPage(){
    await genProductsFetch();
    console.log(cart);
  }
  loadPage();
  