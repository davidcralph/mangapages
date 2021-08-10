/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

export default class Navbar extends React.PureComponent {
  changeTheme = () => {
    document.body.classList.toggle('dark');
    const themeicon = document.getElementById('themeicon');
    if (themeicon.classList.contains('fa-moon')) {
      themeicon.classList.remove('fa-moon');
      themeicon.classList.add('fa-sun');
      localStorage.setItem('theme', 'light');
    } else {
      themeicon.classList.remove('fa-sun');
      themeicon.classList.add('fa-moon');
      localStorage.setItem('theme', 'dark');
    }
  }

  componentDidMount() {
    const theme = localStorage.getItem('theme');
    const themeicon = document.getElementById('themeicon');

    if (theme && theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.body.classList.add('dark');
      } else {      
        themeicon.classList.remove('fa-moon');
        themeicon.classList.add('fa-sun');
        document.body.classList.remove('dark');
      }
    }
  }

  render() {
    return (
      <div className='hero-head'>
        <nav className='navbar'>
          <div className='container'>
            <div className='navbar-brand'>
              <a className='navbar-item logo' onClick={() => this.props.resetSearch()}>
                📖 Manga Pages
              </a>
              <span className='navbar-burger' data-target='navbarmobile'>
                <span></span>
                <span></span>
                <span></span>
              </span>
            </div>
            <div id='navbarmobile' className='navbar-menu'>
              <div className='navbar-end'>
                <a className='navbar-item' href='https://docs.davidjcralph.co.uk/#/manga'>
                  Docs
                </a>
                <a className='navbar-item' href='https://github.com/davidjcralph/mangapages'>
                  GitHub
                </a>
                <a className='navbar-item' onClick={this.changeTheme}>
                  <i className='fa fa-moon' id='themeicon'/>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
