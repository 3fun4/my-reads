import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'

class BookSearch extends Component {

  static propTypes = {
    showingBooks: PropTypes.array.isRequired
  }

	state = {
    query: '',
    showingBooks: [],
    booksOnShelf: this.props.booksOnShelf
  }

  setStateAsyc(state) {
    return new Promise((resolve)=>{ this.setState(state, resolve) })
  }

  updateQuery = (query) => {
    this.setState({ query: query })
  }

  queryBooks = (query) => {
    if(query){
      BooksAPI.search(query,10).then((books)=>{
console.log(query);
console.log(books);
        if(books && books.length>0){
          books.map(book => {
            book.shelf = 'none';
              this.props.booksOnShelf.forEach(
              bookOnShelf => {
                if(book.id===bookOnShelf.id){
                  book.shelf = bookOnShelf.shelf;
                }
              }
            )
          });
          this.setStateAsyc({showingBooks: books})
        }else{
          this.setState({showingBooks: []})
        }
      })
    }else{
      this.setState({showingBooks: []})
    }

  }

  handleQuery = (e) => {
    const keywords = e.target.value.trim();
    this.updateQuery(keywords)
    this.queryBooks(keywords)
  }

  AddToBookShelf = (book, shelf) => {
    this.props.onSelectChangerOption(book, shelf)
  }

  //TODO: //update bookshelf on search page
  componentWillReceiveProps(nextProps){
    this.queryBooks(this.state.query);
  }

	render() {

    const { onSelectChangerOption } = this.props;
    const { query, showingBooks } = this.state;

    let booksOnShelfCurrentlyReading = showingBooks.filter((book)=>(book.shelf==='currentlyReading') )
    let booksOnShelfWantToRead = showingBooks.filter((book)=>(book.shelf==='wantToRead') )
    let booksOnShelfRead = showingBooks.filter((book)=>(book.shelf==='read') )

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
            <BookShelf shelfTitle="Currently Reading" books={booksOnShelfCurrentlyReading} onSelectChangerOption={onSelectChangerOption} />
            <BookShelf shelfTitle="Want to Read" books={booksOnShelfWantToRead} onSelectChangerOption={(book, shelf)=>this.AddToBookShelf(book,shelf)} />
            <BookShelf shelfTitle="Read" books={booksOnShelfRead} onSelectChangerOption={(book, shelf)=>this.AddToBookShelf(book,shelf)} />
            <BookShelf shelfTitle="Search Results" books={showingBooks} onSelectChangerOption={(book, shelf)=>this.AddToBookShelf(book,shelf)} />
          </div>
        </div>
      </div>
		)
	}

}

export default BookSearch