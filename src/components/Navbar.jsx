/* eslint-disable jsx-a11y/anchor-is-valid */
import { PureComponent, createRef } from 'react';

export default class Navbar extends PureComponent {
  constructor() {
    super();
    this.themeIcon = createRef();
    this.navbarBurger = createRef();
  }

  changeTheme = () => {
    document.documentElement.classList.toggle('dark');
    const themeicon = this.themeIcon.current;
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
    const themeicon = this.themeIcon.current;

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

    // mobile navbar
    const navbarBurger = this.navbarBurger.current;
    navbarBurger.addEventListener('click', () => {
      const target = navbarBurger.dataset.target;
      const $target = document.getElementById(target);
      navbarBurger.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
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
              <span className='navbar-burger' ref={this.navbarBurger} data-target='navbarmobile'>
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
                  <i className='fa fa-moon' ref={this.themeIcon}/>
                </a>
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}
