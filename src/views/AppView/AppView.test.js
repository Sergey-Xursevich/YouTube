import AppView from './AppView';

describe('AppView.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(AppView.prototype.render).toBeInstanceOf(Function);
  });
});

describe('AppView constructor is an Array', () => {
  it('Should be an instance of Array', () => {
    const appView = new AppView([]);
    expect(appView.titles).toStrictEqual([]);
  });
});
