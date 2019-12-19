import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from '../components/Book'
import { Link } from 'react-router-dom'

class Search extends Component {

  state = {
    query: '',
    notFound: false,
    loading: false,
    books: []
  }

  handlerChange = (event) => {
    const query = event.target.value;
    this.setState(
      () => ({ query }),
      () => {
        setTimeout(() => {
          if (this.state.query === query)
            this.search(query);
        }, 500)
      });
  }

  search = async (query) => {

    if (query === '') {
      this.setState(() => ({
        books: [],
        notFound: false
      }));
      return;
    }

    this.setState(() => ({
      loading: true
    }))

    const [books, myBooks] = await Promise.all([
      BooksAPI.search(query),
      BooksAPI.getAll()]
    )
    console.log(books, myBooks)
    
    if (!books.error)
      this.setState(() => ({
        books : books.map(b => ({
                                  ...b,
                                  shelf: myBooks.find(myBook => myBook.id === b.id) ? 
                                         myBooks.find(myBook => myBook.id === b.id).shelf : 
                                         ''
                              })),
        notFound: false,
        loading: false
      }));
    else
      this.setState(() => ({
        books: [],
        notFound: true,
        loading: false
      }));
  }

  render() {
    const { books, notFound, loading } = this.state;

    return (
      <div>
        {loading && <div className="loading">
          <div></div>
        </div>}
        <div className="search-books">

          <div className="search-books-bar">
            <Link className="close-search" to="/">Close</Link>
            <div className="search-books-input-wrapper">
              <input type="text"
                value={this.state.query}
                onChange={this.handlerChange}
                placeholder="Search by title or author" />

            </div>
          </div>

          <div className="search-books-results">
            <div className="books-grid">
              {notFound && <p>Not found ):</p>}
              {books.map((b, key) => (
                <Book book={b} key={key} />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Search