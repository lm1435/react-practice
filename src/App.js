import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';


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

  render() {
    const { list, searchTerm } = this.state;
    return (
      <div className="App page">
        <div className=" interaction">
          <Search 
            onChange={this.onSearchChange}
            value={searchTerm}
          >
            Search
          </Search>
        </div>
        <Table 
          list={list}
          pattern={searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

export default App;