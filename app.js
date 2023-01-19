/* eslint-disable no-plusplus */
class Book {
  constructor(author, Title, Books) {
    this.author = author;
    this.Title = Title;
    this.Books = Books;
    this.index = 0;
  }

  ToLocalStorage = (b) => {
    localStorage.setItem('Data', JSON.stringify(b));
  };

  renderbooks() {
    if (localStorage.getItem('Data') !== null) {
      this.Books = JSON.parse(localStorage.getItem('Data'));
      document.getElementById('listitems').innerHTML = '';
      this.Books.forEach((bookitem) => {
        document.getElementById('listitems').innerHTML += `<tr>
        <td>"${bookitem.Title}" by ${bookitem.author}</td>
        <td><button class='remove-btn' id=${this.index++}>remove</button></td>
    </tr>`;
      });
    }
  }

  removebook(id) {
    let i = -1;
    this.Books = this.Books.filter(() => {
      i++;
      // eslint-disable-next-line eqeqeq
      return i != id;
    });
    localStorage.setItem('Data', JSON.stringify(this.Books));
  }
}
let Books = JSON.parse(localStorage.getItem('Data')) || [];
const title = document.getElementById('title');
const author = document.getElementById('author');
const bookobj = new Book(author.value, title.value, Books);

bookobj.renderbooks();

document.getElementById('add-btn').onclick = (e) => {
  e.preventDefault();
  const bookitem = { Title: title.value, author: author.value };
  Books.push(bookitem);
  title.value = '';
  author.value = '';
  bookobj.ToLocalStorage(Books);
  // eslint-disable-next-line no-plusplus
  bookobj.renderbooks();
  document.querySelectorAll('.remove-btn').forEach((btn) => {
    Books = JSON.parse(localStorage.getItem('Data'));
    btn.addEventListener('click', (e) => {
      // eslint-disable-next-line no-use-before-define
      bookobj.removebook(e.target.id);
      // ToLocalStorage();
      bookobj.renderbooks();
      window.location.reload();
    });
  });
};

document.querySelectorAll('.remove-btn').forEach((btn) => {
  Books = JSON.parse(localStorage.getItem('Data'));
  btn.addEventListener('click', (e) => {
    bookobj.removebook(e.target.id);
    // ToLocalStorage();
    bookobj.renderbooks();
    window.location.reload();
  });
});
