import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">eBlotter</h1>
        <p className="home-subtitle">Financial Trading & Portfolio Management System</p>

        <div className="home-cards">
          <Link to="/search" className="home-card">
            <div className="card-icon">🔍</div>
            <h3>Trade Search</h3>
            <p>Search and filter trade blotter entries</p>
          </Link>

          <Link to="/deal" className="home-card">
            <div className="card-icon">💼</div>
            <h3>Deal Management</h3>
            <p>Manage deals and allocations</p>
          </Link>

          <Link to="/portfolio" className="home-card">
            <div className="card-icon">📊</div>
            <h3>Portfolios</h3>
            <p>View and manage investment portfolios</p>
          </Link>

          <Link to="/broker" className="home-card">
            <div className="card-icon">🏢</div>
            <h3>Brokers</h3>
            <p>Lookup and manage broker information</p>
          </Link>
        </div>

        <div className="home-stats">
          <div className="stat-card">
            <div className="stat-value">Active</div>
            <div className="stat-label">System Status</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">v1.0</div>
            <div className="stat-label">Version</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
