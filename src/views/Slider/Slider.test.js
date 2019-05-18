import Slider from './Slider';

describe('Slider render', () => {
  it('Should be an instance of Function', () => {
    expect(Slider.prototype.render).toBeInstanceOf(Function);
  });
});

describe('Slider delete', () => {
  it('Should be an instance of Function', () => {
    expect(Slider.delete).toBeInstanceOf(Function);
  });
});

describe('Should be an render correctly', () => {
  Slider.prototype.render();
  expect(document.body.innerHTML).toMatchSnapshot();
});

describe('Should be an delete correctly', () => {
  Slider.delete();
  expect(document.body.innerHTML).toMatchSnapshot();
});
