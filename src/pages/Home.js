import React, { Component } from 'react'

import Book from '../components/Book'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'

class Home extends Component {

    state = {
        loading: false,
        shelves: [
            {
                title: 'Currently Reading',
                statusName: 'currentlyReading'
            },
            {
                title: 'Want to Read',
                statusName: 'wantToRead'
            },
            {
                title: 'Read',
                statusName: 'read'
            }
        ],
        books: []
    }


    componentDidMount() {
        this.refreshBooks();
    }

    refreshBooks = async () => {
        this.setState(() => ({
            loading: true
        }))

        const books = await BooksAPI.getAll();

        this.setState(() => ({
            books,
            loading: false
        }));
    }

    handlerBookEvent = async (book, event) => {
        event.preventDefault();
        this.setState(() => ({
            loading: true
        }))

        await BooksAPI.update(book, event.target.value);
        this.refreshBooks();
    }

    render() {

        const { books, shelves, loading } = this.state;

        return (
            <div className="list-books">
                { loading && <div className="loading">
                        <div></div>
                </div>}
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">

                    <div>
                        {shelves.map(shelf => (
                            <div className="bookshelf" key={shelf.statusName}>
                                <h2 className="bookshelf-title">{shelf.title}</h2>
                                <div className="bookshelf-books">
                                    <div className="books-grid">
                                        {books.filter(b => b.shelf === shelf.statusName).map((b) => (
                                            <Book key={b.id} book={b} onStatusChanged={this.handlerBookEvent} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="open-search">
                    <Link to='search'><button>Add a book</button></Link>
                </div>
            </div>
        )
    }
}

export default Home