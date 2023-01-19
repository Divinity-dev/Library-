/* eslint-disable no-plusplus */
let Books = [];
class Book {
  constructor(author, Title) {
    this.author = author;
    this.Title = Title;
  }
}
let index = 0;
const title = document.getElementById('title');
const Author = document.getElementById('author');

const ToLocalStorage = () => {
  localStorage.setItem('Data', JSON.stringify(Books));
};

function renderbooks() {
  if (localStorage.getItem('Data') !== null) {
    Books = JSON.parse(localStorage.getItem('Data'));
    document.getElementById('listitems').innerHTML = '';
    Books.forEach((bookitem) => {
      document.getElementById('listitems').innerHTML += `<tr>
      <td>"${bookitem.Title}" by ${bookitem.author}</td>
      <td><button class='remove-btn' id=${index++}>remove</button></td>
  </tr>`;
    });
  }
}
renderbooks();

document.getElementById('add-btn').onclick = (e) => {
  e.preventDefault();
  const bookitem = new Book(Author.value, title.value);
  Books.push(bookitem);
  title.value = '';
  Author.value = '';
  ToLocalStorage();
  // eslint-disable-next-line no-plusplus
  renderbooks();
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    Books = JSON.parse(localStorage.getItem('Data'));
    btn.addEventListener('click', (e) => {
      // eslint-disable-next-line no-use-before-define
      removebook(e.target.id);
      // ToLocalStorage();
      renderbooks();
      window.location.reload();
    });
  });
};

function removebook(id) {
  let i = -1;
  Books = Books.filter(() => {
    i++;
    // eslint-disable-next-line eqeqeq
    return i != id;
  });
  localStorage.setItem('Data', JSON.stringify(Books));
}

document.querySelectorAll('.remove-btn').forEach((btn) => {
  Books = JSON.parse(localStorage.getItem('Data'));
  btn.addEventListener('click', (e) => {
    removebook(e.target.id);
    // ToLocalStorage();
    renderbooks();
    window.location.reload();
  });
});
