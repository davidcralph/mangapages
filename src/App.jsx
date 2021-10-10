import { PureComponent, createRef } from 'react';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Random from './components/Random';
import Results from './components/Results';

import * as Constants from './modules/constants';
import mangaPlaceholders from './modules/mangaPlaceholders';
import lightNovelPlaceholders from './modules/lightNovelPlaceholders';

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
      placeholder: mangaPlaceholders(),
      type: 'manga'
    };
    this.dropdown = createRef();
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
      query,
      resultsDone: false
    });

    const mangaResults = await (await fetch(`${Constants.API_URL}/search?input=${query}&type=${this.state.type.replace(' ', '')}`)).json();

    this.setState({
      mangaResults: mangaResults,
      resultsDone: true
    });
  }

  async getRandom() {
    const random = await (await fetch(`${Constants.API_URL}/random?type=${this.state.type.replace(' ', '')}`)).json();
    this.setState({ 
      random,
      done: true 
    });
  }

  toggleDropdown() {
    this.dropdown.current.classList.toggle('is-active');
  }

  async setType(type) { 
    let placeholder = mangaPlaceholders();
    if (type === 'light novel') {
      placeholder = lightNovelPlaceholders();
    }

    // todo: running .getRandom() for some reason doesn't get the correct type - need to figure out why
    const random = await (await fetch(`${Constants.API_URL}/random?type=${type.replace(' ', '')}`)).json();

    this.setState({
      type,
      placeholder,
      random
    });

    this.toggleDropdown();
  }

  componentDidMount() {
    this.getRandom();
  }

  render() {
    return (
      <>
        <section className='hero is-info is-large header-image'>
          <Navbar resetSearch={() => this.onSearch()}/>
          <div className='hero-body'>
            {navigator.onLine ? 
              <div className='container has-text-centered'>
                <h1 className='title'>Search for a <div className='dropdown' ref={this.dropdown}>
                  <div className='dropdown-trigger' onClick={() => this.toggleDropdown()}>
                    {this.state.type}
                    <span className='icon is-small'>
                      <i className='fas fa-angle-down' aria-hidden='true'/>
                    </span>
                    </div>
                    <div className='dropdown-menu' role='menu'>
                      <div className='dropdown-content'>
                        <span className='dropdown-item' onClick={() => this.setType('manga')}>Manga</span>
                        <span className='dropdown-item' onClick={() => this.setType('light novel')}>Light Novel</span>
                      </div>
                    </div>
                </div> ...</h1>
                <input className='input' type='search' value={this.state.query} onChange={(data) => this.onSearch(data.target.value)} placeholder={this.state.placeholder} />
              </div>
            : null}
          </div>
        </section>
        <section className='section'>
          <div className='mangaresults'>
            {navigator.onLine ? this.state.query ? 
              <Results data={this.state.mangaResults} done={this.state.resultsDone} type={this.state.type}/> : 
              <Random data={this.state.random} type={this.state.type} refresh={() => this.getRandom()}/>
            : <h2 className='subtitle'>Please connect to the internet</h2>}
          </div>
        </section>
        <Footer/>
      </>
    );
  }
}
