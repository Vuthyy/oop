class Book {
  constructor(title, author, genre, available = true) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.available = available;
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
    console.log(`Added book: ${book.title}`);
  }

  removeBook(title, isbn) {
    this.books = this.books.filter(
      (book) => book.title !== title || book.isbn !== isbn
    );
    console.log(`Removed book with title: ${title}`);
  }
}
