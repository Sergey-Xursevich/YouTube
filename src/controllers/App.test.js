import App from './App';

describe('App start', () => {
  it('Should be an instance of Function', () => {
    expect(App.prototype.start).toBeInstanceOf(Function);
  });
});

describe('App constructor field state is Object', () => {
  it('Should be an instance of Array', () => {
    const data = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOUnVFwJBygWONavqzgR5KGKtwd5kxzco&type=video&part=snippet&maxResults=16&q=',
      model: null,
      data: null,
      view: null,
      href: null,
    };
    const app = new App({});
    expect(app.state).toStrictEqual(data);
  });
});

describe('Function couting slide', () => {
  it('Correct display of width', () => {
    const app = new App({});
    const test = [
      { size: 504, result: 1 },
      { size: 864, result: 2 },
      { size: 1320, result: 3 },
      { size: 1920, result: 4 },
    ];
    test.forEach((element) => {
      expect(app.countSlideList(element.size)).toStrictEqual(element.result);
    });
  });
});

describe('App constructor field state is Object', () => {
  it('Should be return of Function', () => {
    const app = new App({});
    expect(typeof app.onresize).toStrictEqual('function');
  });
});

describe('App constructor field state is Object', () => {
  it('Should be return of Function', () => {
    const app = new App({});
    expect(typeof app.list).toStrictEqual('function');
  });
});
