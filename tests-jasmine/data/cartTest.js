import { addCartItem,cart,loadCart } from "../../data/cart.js";
console.log(cart);
describe('test suite:addCartItem',()=>{
  it('adding a new Item ',()=>{
    spyOn(localStorage,'setItem');
    spyOn(localStorage,'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    });
    loadCart();

    addCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    addCartItem('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
});