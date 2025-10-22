import PortfolioForm from '../components/portfolio/PortfolioForm';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import './Portfolio.css';

function Portfolio() {
  return (
    <div className="portfolio-page">
      <div className="header-bar">
        <h4>Portfolio Management</h4>
      </div>
      <PortfolioForm />
      <PortfolioGrid />
    </div>
  );
}

export default Portfolio;
