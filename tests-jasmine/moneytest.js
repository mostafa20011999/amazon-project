import { twoDigits } from "../data/products.js";
describe('test suite:formatCurrency',()=>{
  it('converts cents to dollars',()=>{
    expect(twoDigits(2095)).toEqual('20.95');
  });
  it('works with 0',()=>{
    expect(twoDigits(0)).toEqual('0.00');
  });
  it('works with fraction',()=>{
    expect(twoDigits(2000.5)).toEqual('20.01');
  });
});
