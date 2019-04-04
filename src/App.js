import React, { Component } from 'react';
import './App.css';
import Search from './Search';
import Table from './Table';
import Button from './Button';


const DEFAULT_QUERY = 'redux';

const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
const PARAM_PAGE='page='

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: null,
      searchTerm: DEFAULT_QUERY,
      searchKey: '',
      error: null
    };
  }

  propExistsOnState = (searchTerm) => {
    return !this.state.results[searchTerm];
  }

  setSearchTopStories = (result) => {
    const { hits, page } = result;
    const { results, searchKey } = this.state;
    const oldHits = results && results[searchKey] ? results[searchKey].hits : [];
    const updatedHits = [
      ...oldHits, 
      ...hits
    ];
    this.setState({ 
      results: { ...results, [searchKey] : { hits: updatedHits, page }}
    });

  }

  onDismiss = (id) => {
    const { results, searchKey } = this.state;
    const { page, hits } = results[searchKey];
    const isNotId = (item) => item.objectID !== id;

    const updatedHits = hits.filter(isNotId);

    this.setState({
      results: { ...results, [searchKey]: { hits: updatedHits, page}},
    })
  }

  onSearchSubmit = (e) => {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    if (this.propExistsOnState(searchTerm))
      this.fetchSearchTopStories(searchTerm);
    e.preventDefault();
  }

  fetchSearchTopStories = (searchTerm, page = 0) => {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}&${PARAM_PAGE}${page}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result))
    .catch(error => this.setState({ error }));
  }

  onSearchChange = (e) => {
    this.setState({
      searchTerm: e.target.value,
    });
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.setState({ searchKey: searchTerm });
    this.fetchSearchTopStories(searchTerm);
  }

  render() {
    const { results, searchTerm, searchKey, error } = this.state;
    const page =  (results && results[searchKey] && results[searchKey].page) || 0;
    const list = (results && results[searchKey] && results[searchKey].hits) || [];
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
        {
          error ? 
          <div><p>Well this is embarrassing.</p><p>Please try again.</p></div> :
          <React.Fragment>
            <Table 
              list={list}
              onDismiss={this.onDismiss}
            />
            <div style={{marginTop: '10px'}}>
            { page > 0 ?
                <Button
                  className={'previous'}
                  onClick={()=>this.fetchSearchTopStories(searchKey, page-1)}
                >
                  Less
                </Button> : null
              }
              <Button
                onClick={()=>this.fetchSearchTopStories(searchKey, page+1)}
              >
                More
              </Button>
            </div>
          </React.Fragment>
        }
      </div>
    );
  }
}

export default App;