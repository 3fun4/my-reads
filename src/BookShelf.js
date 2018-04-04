import React from 'react';
import Book from './Book'

function BookShelf(props) {

		return (
			<div className="bookshelf">
        <h3 className="bookshelf-title">{props.shelfTitle}</h3>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {props.books.map((book)=>(
              <Book key={book.id} book={book} onSelectChangerOption={props.onSelectChangerOption} />
            ))}
          </ol>
        </div>
      </div>
    )

}

export default BookShelf