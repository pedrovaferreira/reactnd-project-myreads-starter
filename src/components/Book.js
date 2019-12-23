import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            loading: false,
            book: props.book
        }
    }

    handlerChange = async (event) => {

        event.preventDefault();

        const action = event.target.value;

        this.setState(() => ({
            loading: true
        }))

        if (action === "move") return;

        const { book } = this.state;
        await BooksAPI.update(book, action);
        book.shelf = action;

        if(this.props.onStatusUpdated)
            this.props.onStatusUpdated(action);
        else {
            alert('Movie movied')
        }

        this.setState(() => ({
            loading: false,
            book
        }))

    }
    render() {
        
        const lyrics = {
            'currentlyReading': 'Currently Reading',
            'read': 'Read',
            'wantToRead': 'Want to Read'
        }

        const { book } = this.state;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail: ''}")` }}></div>
                    <div className={this.state.loading ? 'book-shelf-changer loading-icon' : 'book-shelf-changer'}>
                        <select onChange={this.handlerChange} value={book.shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                {book.shelf !== 'none' && <div className="book-shelf" title={lyrics[book.shelf]}>{lyrics[book.shelf].substring(0,1)}</div>}
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'unknow'}</div>
            </div>
        )
    }
}

export default Book;