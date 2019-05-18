import SearchView from './SearchView';

describe('Slider render', () => {
  it('Should be an instance of Function', () => {
    expect(SearchView.prototype.render).toBeInstanceOf(Function);
  });
});


describe('Should be an render correctly', () => {
  SearchView.prototype.render();
  expect(document.body.innerHTML).toMatchSnapshot();
});
