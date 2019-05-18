export default class SearchView {
  render() {
    const { body } = document;
    const search = document.createElement('div');
    const inputSearch = document.createElement('input');
    const btnSearch = document.createElement('button');

    body.appendChild(search);
    search.classList.add('search');

    inputSearch.setAttribute('type', 'text');
    inputSearch.setAttribute('placeholder', 'What kind of video do you want to find?');

    btnSearch.setAttribute('type', 'submit');
    btnSearch.classList.add('btn');

    search.appendChild(inputSearch);
    search.appendChild(btnSearch);
  }
}
