import { PureComponent } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Random from './components/Random';
import Results from './components/Results';

import * as Constants from './modules/constants';
import mangaPlaceholders from './modules/mangaPlaceholders';

import '@fontsource/rubik';
import './scss/index.scss';

export default class App extends PureComponent {
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

    const theme = localStorage.getItem('theme');
    const themeicon = document.getElementById('themeicon');

    if (theme && theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {      
        themeicon.classList.remove('fa-moon');
        themeicon.classList.add('fa-sun');
        document.documentElement.classList.remove('dark');
      }
    }
  }

  render() {
    return (
      <>
        <section className='hero is-info is-large header-image'>
          <Navbar resetSearch={() => this.onSearch()}/>
          <div className='hero-body'>
            {navigator.onLine ? 
              <div className='container has-text-centered'>
                <h1 className='title'>Search for a manga...</h1>
                <input className='input' type='search' value={this.state.query} onChange={(data) => this.onSearch(data.target.value)} placeholder={this.state.placeholder} />
              </div>
            : null}
          </div>
        </section>
        <section className='section'>
          <div className='mangaresults'>
            {navigator.onLine ? this.state.query ? 
              <Results data={this.state.mangaResults} done={this.state.resultsDone}/> : 
              <Random data={this.state.random}/>
            : <h2 className='subtitle'>Please connect to the internet</h2>}
          </div>
        </section>
        <Footer/>
      </>
    );
  }
}
