import { Link } from 'react-router-dom';
import './MenuBar.css';

function MenuBar() {
  return (
    <nav className="menu-bar">
      <div className="menu-container">
        <ul className="menu-items">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/deal">Deal</Link>
          </li>
          <li className="dropdown">
            <span className="dropdown-toggle">Lookups</span>
            <ul className="dropdown-menu">
              <li>
                <Link to="/portfolio">Portfolio</Link>
              </li>
              <li>
                <Link to="/broker">Broker</Link>
              </li>
            </ul>
          </li>
        </ul>
        <div className="welcome-message">
          Welcome: User Name
        </div>
      </div>
    </nav>
  );
}

export default MenuBar;
