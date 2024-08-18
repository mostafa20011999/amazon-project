export function getDeliveryOptionByCart(cartItem){
  let matchingDate;
  deliveryOptions.forEach((deliveryOption)=>{
      if(deliveryOption.id===cartItem.deliveryOptionId){
        matchingDate = deliveryOption;
      }
  })
  return matchingDate;
}
export const deliveryOptions = [
  {
    id : '1',
    day : 7,
    cost :0
  },
  {
    id: '2',
    day : 3,
    cost : 499
  },
  {
    id:'3',
    day: 1,
    cost: 999
  }
  
];