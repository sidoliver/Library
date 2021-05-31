// Book class
class Book {
  constructor(title, author, page, status) {
    this.title = title;
    this.author = author;
    this.page = page;
    this.status = status;
  }
}

// UI class
class UI {
  static displayBook() {
    const books = Storage.getBooks();
    books.forEach((book)=>{
      UI.addBook(book);
    })
  }
  static addBook(book) {
    const div = document.createElement("div");
    const block = document.querySelector(".UI");
    div.innerHTML = `
           <ul>
             <li>"${book.title}"</li>
             <li>Author: ${book.author}</li>
             <li>Page: ${book.page}</li>
           </ul>
           <div>
           <button class='btn'>${book.status}</button>
           <button class='remove'>Remove</button>
           </div>
         `;
    div.setAttribute("class", "box");
    block.appendChild(div);
  }
  static showAlert() {
      alert('fill up the form');
  }
  static clear() {
    document.getElementById("title").value = '';
    document.getElementById("author").value = '';
    document.getElementById("page").value = '';
    document.getElementById("status").value = '';
  }

}


class Storage{
  // book is just a storage key. You can name it anything
  static getBooks() {
     let books;
     if(localStorage.getItem('books') === null) {
       books = [];
     } else {
        books = JSON.parse(localStorage.getItem('books'));
     }
     return books;
  }
  static addToLibrary(book) {
    let books = Storage.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
  }
  static removeFromLibrary(title) {
    const books = Storage.getBooks();
    books.forEach((book,index) => {
      if(book.title === title) {
        books.splice(index,1)
      }
    } );
    localStorage.setItem('books',JSON.stringify(books));
  }
}

document.addEventListener('DOMContentLoaded',UI.displayBook);

const submit = document.getElementById("submit");
submit.addEventListener("click", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const page = document.getElementById("page").value;
  const status = document.getElementById("status").value;

  const book = new Book(title, author, page, status);
  if(book.title === '' || book.author === ''|| book.page === '' || book.status === '') {
      UI.showAlert();
  } else {
    Storage.addToLibrary(book);
    UI.addBook(book);
    UI.clear();
  }
});

const block = document.querySelector(".UI");
block.addEventListener('click',(e)=>{
    let target = e.target;
    console.log(target);
    if(target.classList.contains('btn')) {
       if(target.textContent === 'read') {
         target.textContent = 'unread';
       } else  {
         target.textContent = 'read';
       }
    } else if(target.textContent === 'Remove') {
      target.parentNode.parentNode.remove();
      Storage.removeFromLibrary(target.parentElement.parentElement.firstElementChild.firstElementChild.textContent);

    }
   
})
