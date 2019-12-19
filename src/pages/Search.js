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

  componentDidMount() {
    // BooksAPI.search('')
    //         .then(console.log)
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

    const books = await BooksAPI.search(query);
    if (!books.error)
      this.setState(() => ({
        books,
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
              {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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