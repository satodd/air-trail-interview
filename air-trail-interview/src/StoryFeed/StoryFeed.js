import React from 'react';
import { Pagination, Input, Spin } from 'antd';
import StoryItem from './StoryItem'
import './StoryFeed.css';

function StoryList(props) {
  let state = props.state;

  if (state.isLoading) {
    return <Spin />;
  } else if (state.isError) {
    return <div>Error!</div>;
  } else {
    return ( <StoryItem storyFeed={state.storyFeed}/>)
  }
}


class StoryFeed extends React.Component {
	constructor(props) {
    super(props);

    this.state = {
      storyFeed: [],
      numPages: 0,
      currentPage: 1,
      isLoading: true,
      isError: false,
      storyFilter: ''
    };

    this.setQuery = this.setQuery.bind(this);
    this.nextPage = this.nextPage.bind(this);
  }

  setQuery(e) {
    let query = e.target.value.toLowerCase()
    this.setState((state) => ({ storyFilter: query}));
  }

  nextPage(newPage, pageSize) {
    this.setState((state) =>({ currentPage: newPage}));
  }

  getStories() {
    this.setState({ 
      isLoading: true
    });

    let pageNum = this.state.currentPage - 1;
    let keywordQuery = this.state.storyFilter;
    let query = 'https://hn.algolia.com/api/v1/search?page=' + pageNum

    if (keywordQuery) {
      query = query + '&query=' + keywordQuery
    }

    fetch(query)
    .then(res => {
      return res.json()
    })
    .then((data) => {
      this.setState({ 
        storyFeed: data.hits,
        numPages: data.nbPages,
        currentPage: this.state.currentPage,
        isError: false,
        isLoading: false
      })
    })
    .catch((error) => {
      this.setState({ 
        isError: true,
        isLoading: false
      })
    })
  }

	componentWillMount() {
		this.getStories();
	}

  componentDidUpdate(prevProps, prevState) {
    if(this.state.storyFilter !== prevState.storyFilter || this.state.currentPage !== prevState.currentPage) {
      this.getStories();
    }
  }

  render() {
    return (<div>
        <Input placeholder="Filter by Title" 
               size="large" 
               type="text" 
               id="filter" 
               value={this.state.storyFilter}
               onChange={e => this.setQuery(e)} />
        <StoryList 
          state={this.state} 
          onChange={this.getStories} 
        />
        <div className="pagination-center">
          <Pagination
            defaultCurrent={this.state.currentPage} 
            total={this.state.numPages} 
            onChange={this.nextPage} 
          />
        </div>
      </div>
    )

  }
};

export default StoryFeed;
