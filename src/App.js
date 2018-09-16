import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list,
      searchTerm: '',
    };
  }

  onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;

    const updatedList = this.state.list.filter(isNotId);

    this.setState({
      list: updatedList,
    })
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    })
  }

  isSearched = (searchTerm) => {
    return function(item){
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
    }
  }

  /*
    When a search is started the input triggers the function onSearchChange which sets the state property searchTerm, which then causes a rerender of the component. 
    Then the filter has access to the list array which it compares the searchTerm against the title as stated in the isSearch function. 
  */
  render() {
    return (
      <div className="App">
        <form>
          <input type="text"
            onChange={this.onSearchChange}
          />
        </form>
        {this.state.list.filter(this.isSearched(this.state.searchTerm)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                //need to pass the dismiss fxn to an annonymous fxn to prevent from the browser running the function on page load.
                onClick={() => this.onDismiss(item.objectID)} type="button">X</button>
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default App;