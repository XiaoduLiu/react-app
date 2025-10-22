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
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
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
