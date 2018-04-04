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
    booksOnShelf: PropTypes.array,
    searchResults: PropTypes.array
  }

  MAX_RESULTS = 30;

  state = {
    booksOnShelf: [],
    searchResults: []
  }

  componentDidMount(){
    this.getBooksOnShelf();
  }

  getBooksOnShelf = () => {
    BooksAPI.getAll().then((books)=>{
      this.setState({booksOnShelf:books})
    });
  }

  changeBookShelf = (book,shelf) => {
    BooksAPI.update(book,shelf).then((rev)=>{
      //update local copy of the booksOnShelf
      book.shelf=shelf;
      //render
      this.setState(state=>({
        booksOnShelf: state.booksOnShelf.filter(bookOnShelf=>bookOnShelf.id!==book.id).concat([book])
      }));
    });
  }

  searchBooks = (query) => {

console.log(query);

    if(query){
console.log('start searching...');

      BooksAPI.search(query,this.MAX_RESULTS).then((res)=>{
console.log('got response...');
console.log(res);

        if(res.error){
          console.log(res.error);
          this.setState({searchResults:[]});
        }else{
          if(res.length>0){
            res.forEach(book => {
              const bookAlreadyOnShelf = this.state.booksOnShelf.find(bookOnShelf=>bookOnShelf.id===book.id);
              book.shelf = bookAlreadyOnShelf?bookAlreadyOnShelf.shelf:'none';
            });
            this.setState({searchResults: res});
          }else{
            this.setState({searchResults: []});
          }
        }
      });
    }else{
      this.setState({searchResults: []});
    }

  }


  render() {
    const {booksOnShelf,searchResults} = this.state

    let booksCurrentlyReading = booksOnShelf.filter((book)=>(book.shelf==='currentlyReading') )
    let booksWantToRead = booksOnShelf.filter((book)=>(book.shelf==='wantToRead') )
    let booksRead = booksOnShelf.filter((book)=>(book.shelf==='read') )

    return (
      <div className="app">
          <Route path='/search' render={()=>(
              <BookSearch booksOnShelf={booksOnShelf} onSelectChangerOption={this.changeBookShelf} onUpdateSearch={this.searchBooks} searchResults={searchResults} />
          )} />
          <Route exact path='/' render={()=>(
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                    <BookShelf key="bookShelfCurrentlyReading" shelfTitle="Currently Reading" books={booksCurrentlyReading} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
                    <BookShelf key="bookShelfWantToRead" shelfTitle="Want to Read" books={booksWantToRead} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
                    <BookShelf key="bookShelfRead" shelfTitle="Read" books={booksRead} onSelectChangerOption={(book, shelf)=>this.changeBookShelf(book,shelf)} />
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
