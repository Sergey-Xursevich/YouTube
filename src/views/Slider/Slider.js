export default class Slider {
  render() {
    const section = document.createElement('div');
    const container = document.createElement('div');
    const prevLeft = document.createElement('button');
    const prevRight = document.createElement('button');
    const divButton = document.createElement('div');
    const circle = document.createElement('div');
    const slider = document.createElement('div');

    document.body.appendChild(section);
    section.classList.add('section-slider');

    section.appendChild(container);
    container.classList.add('slider-container');

    document.body.appendChild(divButton);
    divButton.classList.add('slider-container__button');

    document.querySelector('.slider-container').appendChild(slider);
    slider.classList.add('slider');

    divButton.appendChild(prevLeft);
    prevLeft.innerHTML = '<i class="fa fa-chevron-left fa-2x"></i>';
    prevLeft.classList.add('prev');

    divButton.appendChild(circle);
    circle.classList.add('round');
    circle.innerHTML = '1';

    divButton.appendChild(prevRight);
    prevRight.innerHTML = '<i class="fa fa-chevron-right fa-2x"></i>';
    prevRight.classList.add('next');
  }

  static delete() {
    const slider = document.querySelector('.slider');
    const child = document.querySelectorAll('.slide');

    for (let i = 0; i < child.length; i += 1) {
      slider.removeChild(child[i]);
    }
  }
}
