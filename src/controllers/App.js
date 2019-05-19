import AppModel from '../models/AppModel';
import AppView from '../views/AppView';
import SearchView from '../views/SearchView';
import Slider from '../views/Slider';

export default class App {
  constructor() {
    this.state = {
      url: 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyBOUnVFwJBygWONavqzgR5KGKtwd5kxzco&type=video&part=snippet&maxResults=16&q=',
      model: null,
      data: null,
      view: null,
      href: null,
    };
    this.count = null;
    this.check = 10;
    this.isDown = false;
    this.startX = null;
    this.scrollLeft = null;
    this.x = null;
    this.tmp = 1;
    this.accumScroll = null;
    this.touchPoint = null;
    this.onresize = function () {
      const width = document.querySelector('.slider-container').clientWidth;

      if (this.widthStr !== width) {
        document.querySelector('.slider').scrollBy(-200000000, 0);
        document.querySelector('.round').innerHTML = `${this.count = 1}`;
        this.x = null;
        this.widthStr = document.querySelector('.slider-container').clientWidth;
      }

      return width;
    };

    this.countSlideList = function (size) {
      if (size < 772) {
        return 1;
      } if (size > 773 && size < 1167) {
        return 2;
      }
      if (size > 1168 && size < 1545) {
        return 3;
      }
      if (size > 1546) {
        return 4;
      }
      return null;
    };

    this.list = async function (num, flag) {
      const slideCount = document.getElementsByClassName('slide').length;
      switch (flag) {
        case 'plus':
          this.changeScreen = this.countSlideList(num);
          this.x += this.countSlideList(num);
          if (this.x < slideCount) {
            if (this.x > this.check) {
              const val = document.querySelector('input').value;
              this.state.url = `https://www.googleapis.com/youtube/v3/search?pageToken=${this.state.data[0]}&key=AIzaSyBOUnVFwJBygWONavqzgR5KGKtwd5kxzco&type=video&part=snippet&maxResults=16&q=`;
              this.state.href = val;

              this.state.model = new AppModel(this.state);
              this.state.data = await this.state.model.getClipNames();
              this.state.view = new AppView(this.state.data[1]);
              this.state.view.render();
              this.check = slideCount - 10;
            }
          }
          break;

        case 'minus':
          this.x -= this.countSlideList(num);
          if (this.x > this.countSlideList(num)) {
            if (this.count < 2) break;
          }
          break;

        default:
          break;
      }
      this.isDown = false;
    };
  }

  async start() {
    const search = new SearchView();
    const slider = new Slider();

    search.render();
    slider.render();

    document.querySelector('button').addEventListener('click', async () => {
      if (document.querySelector('.slide')) {
        Slider.delete();
        this.x = null;
        this.check = 10;
      }

      document.querySelector('.slider-container__button').classList.remove('slider-container__button-opacity');
      document.querySelector('.round').innerHTML = `${this.count = 1}`;

      const val = document.querySelector('input').value;
      this.state.href = val;

      this.state.model = new AppModel(this.state);
      this.state.data = await this.state.model.getClipNames();
      this.state.view = new AppView(this.state.data[1]);

      document.querySelector('.slider-container__button').classList.add('slider-container__button-opacity');
      this.state.view.render();
    });

    document.querySelector('input').addEventListener('keyup', async (e) => {
      const { keyCode } = e;
      if (keyCode === 13) {
        if (document.querySelector('.slide')) {
          Slider.delete();
          this.x = null;
          this.check = 10;
        }

        document.querySelector('input').blur();
        document.querySelector('.slider-container__button').classList.remove('slider-container__button-opacity');
        document.querySelector('.round').innerHTML = `${this.count = 1}`;

        const val = document.querySelector('input').value;
        this.state.href = val;

        this.state.model = new AppModel(this.state);
        this.state.data = await this.state.model.getClipNames();
        this.state.view = new AppView(this.state.data[1]);

        document.querySelector('.slider-container__button').classList.add('slider-container__button-opacity');
        this.state.view.render();
      }
    });

    document.querySelector('.next').addEventListener('click', () => {
      const res = this.onresize() / 0.9;
      if (this.x === 'null') {
        this.x = this.countSlideList(res) + 1;
      }
      const flag = 'plus';
      this.list(res, flag);
      document.querySelector('.round').innerHTML = `${this.count += 1}`;
      document.querySelector('.slider').scrollBy(`${res}`, 0);
      this.accumScroll += res;
    });

    document.querySelector('.prev').addEventListener('click', () => {
      const res = this.onresize() / 0.9;
      if (this.x === 'null') {
        this.x = this.countSlideList(res) - 1;
      }
      document.querySelector('.slider').scrollBy(`-${res}`, 0);
      if (this.count > 1) {
        document.querySelector('.round').innerHTML = `${this.count -= 1}`;
      }
      const flag = 'minus';
      this.list(res, flag);
    });

    document.querySelector('.slider-container').addEventListener('mousedown', (e) => {
      const { pageX } = e;
      this.isDown = true;
      this.startX = pageX - document.querySelector('.slider').offsetLeft;
      this.scrollLeft = document.querySelector('.slider').scrollLeft;

      if (this.startX > (this.onresize() / 2)) {
        document.querySelector('.round').innerHTML = `${this.count += 1}`;
      } else if ((this.onresize() / 2) > this.startX) {
        document.querySelector('.round').innerHTML = `${this.count -= 1}`;
      }
    });

    document.querySelector('.slider-container').addEventListener('mouseleave', () => {
      this.isDown = false;
    });

    document.querySelector('.slider-container').addEventListener('mouseup', () => {
      this.isDown = false;
    });

    document.querySelector('.slider-container').addEventListener('mousemove', (e) => {
      const { pageX } = e;

      if (!this.isDown) return;
      e.preventDefault();
      const delta = pageX - document.querySelector('.slider').offsetLeft;
      if (this.startX > delta) {
        const res = this.onresize() / 0.9;
        document.querySelector('.slider').scrollBy(`${res}`, 0);
        const flag = 'plus';
        this.list(res, flag);
      } else if (delta > this.startX) {
        const wi = getComputedStyle(document.querySelector('.slider')).width;
        const res = wi.slice(0, -2) / 0.9;
        document.querySelector('.slider').scrollBy(`${-res}`, 0);
        const flag = 'minus';
        this.list(res, flag);
      }
    });

    document.querySelector('.slider-container').addEventListener('touchstart', (e) => {
      if (this.onresize() < 700) {
        const touchobj = e.changedTouches[0];
        this.touchPoint = parseInt(touchobj.clientX);

        const res = this.onresize() / 0.9;
        if (this.x === null) {
          this.x = this.countSlideList(res) + 1;
        }
        const flag = 'plus';
        this.list(res, flag);
      }
    });

    document.querySelector('.slider-container').addEventListener('touchend', (e) => {
      const touchobj = e.changedTouches[0];
      const startx = parseInt(touchobj.clientX);

      if (this.onresize() < 700) {
        if (this.touchPoint < startx) {
          if (this.count > 1) {
            document.querySelector('.round').innerHTML = `${this.count -= 1}`;
          }
        } else if (this.touchPoint > startx) {
          document.querySelector('.round').innerHTML = `${this.count += 1}`;
        }
      }
    });

    window.addEventListener('resize', this.onresize);

    this.widthStr = document.querySelector('.slider-container').clientWidth;
  }
}
