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

const isSearched = (searchTerm) => {
  return function(item){
    return item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}


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

  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="App">
        <Search 
          onChange={this.onSearchChange}
          value={searchTerm}
        />

        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component {
  render() {
    const { value, onChange } = this.props;
    return (
      <form>
        <input 
          type="text"
          onChange={onChange}
          value={value}
        />
      </form>
    )
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)} 
                type="button"
              >
                X
              </button>
            </span>
          </div>
        )}
      </div>
    )
  }
}

export default App;