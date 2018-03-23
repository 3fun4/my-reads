import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookSearch extends Component {

  static propTypes = {
    showingBooks: PropTypes.array.isRequired
  }

	state = {
    query: '',
    showingBooks: this.props.searchResults
  }

  setStateAsyc(state) {
    return new Promise((resolve)=>{ this.setState(state, resolve) })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  handleQuery = (e) => {
    const keywords = e.target.value.trim();
    this.updateQuery(keywords)
    this.props.onUpdateSearch(keywords);
  }

  componentWillReceiveProps(nextProps){
    //update bookshelf on search page
    this.setState((prevState, props) => {
      return {showingBooks: props.searchResults};
    });
  }

  componentWillUnmount(){
    //reset search results
    this.props.onUpdateSearch("");
  }

	render() {

    const { onSelectChangerOption } = this.props;
    const { query, showingBooks } = this.state;

    let booksOnShelfCurrentlyReading = showingBooks.filter((book)=>(book.shelf==='currentlyReading') );
    let booksOnShelfWantToRead = showingBooks.filter((book)=>(book.shelf==='wantToRead') );
    let booksOnShelfRead = showingBooks.filter((book)=>(book.shelf==='read') );
    let booksNotOnShelf = showingBooks.filter((book)=>(book.shelf==='none') );

		return (
			<div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
              value={query}
              onChange={this.handleQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>
            <BookShelf key="bookShelfCurrentlyReadingAlready" shelfTitle="Currently Reading" books={booksOnShelfCurrentlyReading} onSelectChangerOption={onSelectChangerOption} />
            <BookShelf key="bookShelfWantToReadAlready" shelfTitle="Want to Read" books={booksOnShelfWantToRead} onSelectChangerOption={onSelectChangerOption} />
            <BookShelf key="bookShelfReadAlready" shelfTitle="Read" books={booksOnShelfRead} onSelectChangerOption={onSelectChangerOption} />
            <BookShelf key="bookShelfSearchResults" shelfTitle="Not on Shelf" books={booksNotOnShelf} onSelectChangerOption={onSelectChangerOption} />
          </div>
        </div>
      </div>
		)
	}

}

export default BookSearch