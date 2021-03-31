import { HighlightSearchPipe } from './search-in-cart.pipe';

describe('SearchInCartPipe', () => {
  it('create an instance', () => {
    const pipe = new HighlightSearchPipe();
    expect(pipe).toBeTruthy();
  });
});
