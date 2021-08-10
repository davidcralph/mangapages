import React from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Random from './components/Random';
import Results from './components/Results';

import * as Constants from './modules/constants';
import mangaPlaceholders from './modules/mangaPlaceholders';

import './scss/index.scss';

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      mangaResults: [],
      random: [],
      done: false,
      resultsDone: false,
      placeholder: mangaPlaceholders()
    };
  }

  async onSearch(query) {
    if (!query) {
      return this.setState({
        query: query,
        resultsDone: false
      });
    }

    // set query first
    this.setState({
      query: query,
      resultsDone: false
    });

    const mangaResults = await (await fetch(`${Constants.API_URL}/search?input=${query}`)).json();

    this.setState({
      mangaResults: mangaResults,
      resultsDone: true
    });
  }

  async getData() {
    const random = await (await fetch(Constants.API_URL + '/random')).json();
    this.setState({ 
      random: random,
      done: true 
    });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <>
        <section className='hero is-info is-large header-image'>
          <Navbar resetSearch={() => this.onSearch()}/>
          <div className='hero-body'>
            <div className='container has-text-centered'>
              <h1 className='title'>Search for a manga...</h1>
              <input className='input' type='search' value={this.state.query} onChange={(data) => this.onSearch(data.target.value)} placeholder={this.state.placeholder} />
            </div>
          </div>
        </section>
        <section className='section'>
          <div className='mangaresults'>
            {this.state.query ? 
            <Results data={this.state.mangaResults} done={this.state.resultsDone}/> : 
            <Random data={this.state.random}/>}
          </div>
        </section>
        <Footer/>
      </>
    );
  }
}
