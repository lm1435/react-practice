import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';


const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: null,
      searchTerm: DEFAULT_QUERY
    };
  }

  setSearchTopStories = (result) => {
    this.setState({ result });
  }

  onDismiss = (id) => {
    const isNotId = (item) => item.objectID !== id;

    const updatedHits = this.state.result.hits.filter(isNotId);

    this.setState({
      result: {...this.state.result, hits: updatedHits},
    })
  }

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }

  fetchSearchTopStories = (searchTerm) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => error);
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { result, searchTerm } = this.state;

    return (
      <div className="App page">
        <div className="interaction">
          <Search 
            onChange={this.onSearchChange}
            value={searchTerm}
            onSubmit={this.onSearchSubmit}
          >
            Search
          </Search>
        </div>
        { result ? 
          <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />
          : null
        }
      </div>
    );
  }
}

export default App;