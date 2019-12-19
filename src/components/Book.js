import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'

class Book extends Component {
    
    state = {
        loading: false
    }

    handlerChange = async (event) => {
        
        event.preventDefault();

        const action = event.target.value;

        this.setState(() => ({
            loading: true
        }))

        if (action === "move") return;

        await BooksAPI.update(this.props.book, action);
        
        if(this.props.onStatusUpdated)
            this.props.onStatusUpdated(action);
        else {
            alert('Movie added')
        }

        this.setState(() => ({
            loading: false
        }))

    }
    render() {

        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks ? book.imageLinks.thumbnail: ''}")` }}></div>
                    <div className={this.state.loading ? 'book-shelf-changer loading-icon' : 'book-shelf-changer'}>
                        <select onChange={this.handlerChange}>
                            <option value="move">Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(', ') : 'unknow'}</div>
            </div>
        )
    }
}

export default Book;