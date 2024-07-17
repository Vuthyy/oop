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

  searchBooks(query) {
    const lowerQuery = query.toLowerCase();
    const results = this.books.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerQuery) ||
        book.author.toLowerCase().includes(lowerQuery) ||
        book.genre.toLowerCase().includes(lowerQuery)
    );
    if (results.length !== 0) {
      console.log(`Books found with query "${query}":`, results);
      return results;
    } else {
      console.log(`No books found with query "${query}".`);
      return null;
    }
  }

  displayAvailableBooks() {
    const availableBooks = this.books.filter((book) => book.available);
    if (availableBooks.length !== 0) {
      console.log("Available books:", availableBooks);
    } else {
      console.log("No available books.");
    }
    return availableBooks;
  }

  borrowBook(title) {
    const book = this.books.find(
      (book) => book.title === title && book.available
    );
    if (book) {
      book.available = false;
      console.log(`Borrowed book: ${book.title}`);
      return book;
    } else {
      console.log(`Book with title "${title}" is not available.`);
      return null;
    }
  }

  returnBook(title) {
    const book = this.books.find(
      (book) => book.title === title && !book.available
    );
    if (book) {
      book.available = true;
      console.log(`Returned book: ${book.title}`);
      return book;
    } else {
      console.log(`Book with title "${title}" was not borrowed.`);
      return null;
    }
  }
}

class User {
  constructor(name) {
    this.name = name;
    this.borrowedBooks = [];
  }

  borrowBook(library, title) {
    const book = library.borrowBook(title);
    if (book) {
      this.borrowedBooks.push(book);
      console.log(`${this.name} borrowed book: ${book.title}`);
    }
    return book;
  }

  returnBook(library, title) {
    const bookIndex = this.borrowedBooks.findIndex(
      (book) => book.title === title
    );
    if (bookIndex !== -1) {
      const book = this.borrowedBooks[bookIndex];
      library.returnBook(title);
      this.borrowedBooks.splice(bookIndex, 1);
      console.log(`${this.name} returned: ${book.title}`);
      return book;
    } else {
      console.log(`${this.name} did not borrow a book with title: ${title}`);
      return null;
    }
  }

  viewBorrowedBooks() {
    console.log(`${this.name}'s borrowed books:`, this.borrowedBooks);
    return this.borrowedBooks;
  }
}

class Admin extends User {
  constructor(name) {
    super(name);
  }
}

class Student extends User {
  constructor(name) {
    super(name);
    this.maxBorrowLimit = 5;
  }

  borrowBook(library, title) {
    if (this.borrowedBooks.length < this.maxBorrowLimit) {
      return super.borrowBook(library, title);
    } else {
      console.log(
        `${this.name} reached the borrow limit of ${this.maxBorrowLimit} books.`
      );
      return null;
    }
  }
}

const library = new Library("City Library");

const book1 = new Book("Book1", "F. Scott Fitzgerald", "Novel");
const book2 = new Book("Book2", "George Orwell", "Dystopian");
const book3 = new Book("Book3", "Harper Lee", "Novel");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

// const admin = new Admin("Thyy");
// const student = new Student("Hourr");

// admin.borrowBook(library, "Book2");
// admin.viewBorrowedBooks();

// student.borrowBook(library, "Book1");
// student.viewBorrowedBooks();

// library.displayAvailableBooks();

// student.returnBook(library, "Book1");
// student.viewBorrowedBooks();

// library.displayAvailableBooks();

// const searchresults = library.searchBooks("novels");
// console.log(searchresults);

const borrowBook = library.borrowBook("Book5");

console.log(borrowBook);
