import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

class BookSearch extends Component {

  static propTypes = {
    showingBooks: PropTypes.array
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
            <BookShelf key="bookShelfSearchResults" shelfTitle="Search Results" books={showingBooks} onSelectChangerOption={onSelectChangerOption} />
          </div>
        </div>
      </div>
		)
	}

}

export default BookSearch