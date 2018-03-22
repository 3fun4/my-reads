import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import BookShelf from './BookShelf'
import BookSearch from './BookSearch'
import './App.css'

class BooksApp extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired
  }

  state = {
    books: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({books})
    })
  }

  changeBookShelf = (book,shelf) => {
console.log(book)
console.log(shelf)
    BooksAPI.update(book,shelf).then((rev)=>{
      BooksAPI.getAll().then((books)=>{
        this.setState({books})
      })
    })
  }


  render() {
    const {books} = this.state

    let booksCurrentlyReading = books.filter((book)=>(book.shelf==='currentlyReading') )
    let booksWantToRead = books.filter((book)=>(book.shelf==='wantToRead') )
    let booksRead = books.filter((book)=>(book.shelf==='read') )

    return (
      <div className="app">
          <Route path='/search' render={()=>(
              <BookSearch booksOnShelf={books} onSelectChangerOption={this.changeBookShelf}/>
          )} />
          <Route exact path='/' render={()=>(
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf shelfTitle="Currently Reading" books={booksCurrentlyReading} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
                    <BookShelf shelfTitle="Want to Read" books={booksWantToRead} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
                    <BookShelf shelfTitle="Read" books={booksRead} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
                  </div>
                </div>
                <div className="open-search">
                  <Link className='open-search' to='/search'>Search books</Link>
                </div>
              </div>
           )} />
      </div>
    )
  }
}

export default BooksApp
