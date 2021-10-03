import React, {useState} from 'react';
import '../App.css';

function Dashboard() {
  const [openMenu, setOpenMenu] = useState(false)
  const [dropdownMenu, setDropdownMenu] = useState(null)
  const toggleDropdown = (menu) => {
    setDropdownMenu(dropdownMenu === menu ? null : menu);
  }
  return (
    <>
      <div className={openMenu ? 'sidebar open' : 'sidebar'}>
        <div className="top-details">
          <a href="#" className="is-desktop">
            <i className="ri-layout-top-fill"></i>
            <span className="links_name">Menu</span>
          </a>
          <div className="right-header is-mobile">
            <ul className="menu ">
              <li>
                <a href="#">
                  <i className="ri-notification-3-fill"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-message-2-line"></i>
                </a>
              </li>
              <li>
                <div className="dropdown-container">
                  <div className="dropdown-toggle" id="connectToggle">
                    John Dankins <i id="connectArrow" className="ri-arrow-down-s-fill"></i>
                  </div>
                  <div className="dropdown-menu" id="connectDropdown">
                    <ul>
                      <li className="dropdown-link"><a href="#">Settings</a></li>
                      <li className="dropdown-link"><a href="#">Exit</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <img src={process.env.PUBLIC_URL + "./img/avatart.png"} alt="Avatar"/>
              </li>
            </ul>
          </div>
        </div>
        <ul className="nav-list">
          <li className="menu">
            <a href="#">
              <i className="ri-dashboard-fill"></i>
              <span className="links_name">Dashboard</span>
            </a>
          </li>
          <li className="menu">
            <a href="#" className="active">
              <i className="ri-calendar-event-fill"></i>
              <span className="links_name">Events</span>
            </a>
          </li>
          <li className="menu">
            <a href="#">
              <i className="ri-bar-chart-fill"></i>
              <span className="links_name">Analytics</span>
            </a>
          </li>
          <li className="menu">
            <a href="#">
              <i className="ri-slideshow-fill"></i>
              <span className="links_name">Operation</span>
            </a>
          </li>
          <li className="menu">
            <a href="#">
              <i className="ri-settings-4-fill"></i>
              <span className="links_name">Settings</span>
            </a>
          </li>
          <li className="menu-bottom">
            <a href="#">
              <i className="ri-question-line"></i>
              <span className="links_name">Help</span>
            </a>
            <a href="#" onClick={() => setOpenMenu(!openMenu)}>
              <i className="ri-arrow-right-s-line"></i>
              <i className="ri-arrow-left-s-line"></i>
              <span className="links_name">Hide</span>
            </a>
          </li>
        </ul>
      </div>
      <section className="home-section">
        <header>
          <div className="left-header">
            <div className="top">
              <img className="logo" src={process.env.PUBLIC_URL + "./img/logo.svg"} alt="Aladdin"/>
              <div className="right-header is-mobile">
                <div className="menu-button" onClick={() => setOpenMenu(!openMenu)}>
                  <i className="ri-menu-line"></i>
                </div>
              </div>
              <form className="input-box">
                <input type="text" placeholder="Search"/>
                <button>
                  <i className="ri-search-line"></i>
                </button>
              </form>
            </div>
            <div className="bottom">
              <h5>Dashboard / <span className="active">Events</span></h5>
            </div>
          </div>
          <div className="right-header is-desktop">
            <ul className="menu">
              <li>
                <a href="#">
                  <i className="ri-notification-3-fill"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="ri-message-2-line"></i>
                </a>
              </li>
              <li>
                <div className="dropdown-container">
                  <div className="dropdown-toggle" id="connectToggle">
                    John Dankins <i id="connectArrow" className="ri-arrow-down-s-fill"></i>
                  </div>
                  <div className="dropdown-menu" id="connectDropdown">
                    <ul>
                      <li className="dropdown-link"><a href="#">Settings</a></li>
                      <li className="dropdown-link"><a href="#">Exit</a></li>
                    </ul>
                  </div>
                </div>
              </li>
              <li>
                <img src={process.env.PUBLIC_URL + "./img/avatart.png"} alt="Avatar"/>
              </li>
            </ul>
          </div>
        </header>
        <article>
          <div className="header-article">
            <div className="left-header">
              <div className="top">
                <form className="input-box">
                  <input type="text" placeholder="Search"/>
                  <button>
                    <i className="ri-search-line"></i>
                  </button>
                </form>
                <a href="#">
                  <i className="ri-pencil-line"></i>
                </a>
                <a href="#">
                  <i className="ri-delete-bin-5-line"></i>
                </a>
              </div>
            </div>
            <div className="right-header">
              <button className="button">
                Create Event
              </button>
              <a href="#" className="active">
                <i className="ri-grid-fill"></i>
              </a>
              <a href="#">
                <i className="ri-list-check"></i>
              </a>
            </div>
          </div>
          <div className="list-box">
            <div className="row">
              <div className="item col-md-4 col-sm-12 col-lg-3">
                <div className="img-box">
                  <img src={process.env.PUBLIC_URL + "./img/img.png"} alt="Dubai Expo 2021"/>
                  <span className="label">Live</span>
                </div>
                <div className="title">
                  Dubai Expo 2021
                </div>
                <div className="place">
                  Dubai, UAE
                </div>
                <div className="date">
                  27.07 – 30.07.2021
                </div>
                <div className="more-box">
                  <a className="dropdown-toggle more" onClick={() => toggleDropdown(0)}><img
                    src={process.env.PUBLIC_URL + "./img/more-vertical.svg"}
                    alt="more"/></a>
                  <div className="dropdown-menu" style={dropdownMenu === 0 ? {display: 'block'} : {display: 'none'}}>
                    <ul>
                      <li className="dropdown-link"><a href="#">Event hall</a></li>
                      <li className="dropdown-link"><a href="#">Event settings</a></li>
                      <li className="dropdown-link"><a href="#">Share</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="item col-md-4 col-sm-12 col-lg-3">
                <div className="img-box">
                  <img src={process.env.PUBLIC_URL + "./img/img.png"} alt="Dubai Expo 2021"/>
                  <span className="label demo">Demo</span>
                </div>
                <div className="title">
                  Dubai Expo 2021
                </div>
                <div className="place">
                  Dubai, UAE
                </div>
                <div className="date">
                  27.07 – 30.07.2021
                </div>
                <div className="more-box">
                  <a className="dropdown-toggle more" onClick={() => toggleDropdown(1)}><img
                    src={process.env.PUBLIC_URL + "./img/more-vertical.svg"}
                    alt="more"/></a>
                  <div className="dropdown-menu" style={dropdownMenu === 1 ? {display: 'block'} : {display: 'none'}}>
                    <ul>
                      <li className="dropdown-link"><a href="#">Event hall</a></li>
                      <li className="dropdown-link"><a href="#">Event settings</a></li>
                      <li className="dropdown-link"><a href="#">Share</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
        <footer>
          <div className="copy">
            Copyright © 2017-2021 AladdinB2B – Connecting Businesses
          </div>
          <ul className="menu">
            <li>
              <a href="#">Terms of Use</a>
              <a href="#">Privacy Policy</a>
              <a href="#">Support</a>
            </li>
          </ul>
          <ul className="menu-right">
            <li>
              <a href="#">Download Apps</a>
              <a href="#"><img src={process.env.PUBLIC_URL + "./img/apple.png"} alt="apple"/></a>
              <a href="#"><img src={process.env.PUBLIC_URL + "./img/android.png"} alt="android"/></a>
            </li>
          </ul>
        </footer>
      </section>
    </>
  );
}

export default Dashboard;
