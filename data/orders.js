export let orderss = JSON.parse(localStorage.getItem('orders')) || [];
export function addOrder(order){
  orderss.unshift(order);
  console.log(orderss);
  saveStorage();
}
function saveStorage(){
  localStorage.setItem('orders',JSON.stringify(orderss));
}