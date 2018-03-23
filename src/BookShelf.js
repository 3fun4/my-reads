import React, { Component } from 'react';

class BookShelf extends Component {

	render() {
		const { books, shelfTitle, onSelectChangerOption } = this.props

		return (
			<div className="bookshelf">
              <h3 className="bookshelf-title">{shelfTitle}</h3>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {books.map((book)=>(
                    <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                          <select defaultValue="NaN" onChange={(event)=> onSelectChangerOption(book,event.target.value)} >
                            <option value="NaN" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    </div>
                  </li>
                  ))}
                </ol>
              </div>
            </div>
		)
	}

}

export default BookShelf