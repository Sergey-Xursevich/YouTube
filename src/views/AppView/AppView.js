export default class AppView {
  constructor(titles) {
    this.titles = titles;
  }

  render() {
    this.titles.forEach((element) => {
      const slide = document.createElement('div');
      const image = document.createElement('img');
      const slideAuthor = document.createElement('div');
      const slideDate = document.createElement('div');
      const slideview = document.createElement('div');
      const slideDescription = document.createElement('div');
      const slideLink = document.createElement('div');
      const href = document.createElement('a');
      const fontAwesomeAuthor = document.createElement('div');
      const fontAwesomeDate = document.createElement('div');
      const fontAwesomeView = document.createElement('div');
      const nodeAuthor = document.createElement('div');
      const nodeDate = document.createElement('div');
      const nodeView = document.createElement('div');
      const time = `${element.date}`.slice(0, 10);
      const text = `${element.description}`.slice(0, 210);
      const title = document.createTextNode(element.title);

      slide.classList.add('slide');
      document.querySelector('.slider').appendChild(slide);

      image.classList.add('image');
      image.setAttribute('src', `${element.img}`);
      slide.appendChild(image);

      slide.appendChild(slideAuthor);
      slideAuthor.classList.add('slide__icon');
      slideAuthor.appendChild(fontAwesomeAuthor);
      fontAwesomeAuthor.innerHTML = '<i class="fa fa-users"></i>';
      slideAuthor.appendChild(nodeAuthor);
      nodeAuthor.innerHTML = `${element.author}`;

      slide.appendChild(slideDate);
      slideDate.classList.add('slide__icon');
      slideDate.appendChild(fontAwesomeDate);
      fontAwesomeDate.innerHTML = '<i class="fa fa-calendar"></i>';
      slideDate.appendChild(nodeDate);
      nodeDate.innerHTML = `${time}`;

      slide.appendChild(slideview);
      slideview.classList.add('slide__icon');
      slideview.appendChild(fontAwesomeView);
      fontAwesomeView.innerHTML = '<i class="fa fa-eye"></i>';
      slideview.appendChild(nodeView);
      nodeView.innerHTML = `${element.view}`;

      slide.appendChild(slideDescription);
      slideDescription.classList.add('slide__description');
      const textElement = document.createTextNode(`${text}...`);
      slideDescription.appendChild(textElement);

      slide.appendChild(slideLink);
      slideLink.classList.add('slide__link');
      slideLink.appendChild(href);
      href.setAttribute('href', element.videoLink);
      href.setAttribute('target', '_blank');
      href.appendChild(title);
    });
  }
}
