import App from './App';

describe('App start', () => {
  it('Should be an instance of Function', () => {
    expect(App.prototype.start).toBeInstanceOf(Function);
  });
});
