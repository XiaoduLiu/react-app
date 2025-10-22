import { useState, ChangeEvent, FormEvent } from 'react';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import './Portfolio.css';

interface FormData {
  portfolioType: string;
  portfolioName: string;
  portfolioCode: string;
}

function Portfolio() {
  const [formData, setFormData] = useState<FormData>({
    portfolioType: '',
    portfolioName: '',
    portfolioCode: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Add New clicked:', formData);
    alert('Portfolio added!');
  };

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData({
      portfolioType: '',
      portfolioName: '',
      portfolioCode: ''
    });
  };

  return (
    <div className="portfolio-page">
      <div className="header-bar">
        <h4>Portfolio Management</h4>
      </div>

      <form onSubmit={handleAddNew} className="portfolio-inline-form">
        <div className="form-row">
          <div className="form-input-group">
            <label htmlFor="portfolioType">Portfolio Type</label>
            <select
              id="portfolioType"
              name="portfolioType"
              value={formData.portfolioType}
              onChange={handleChange}
            >
              <option value="">Select type</option>
              <option value="Equity">Equity</option>
              <option value="Fixed Income">Fixed Income</option>
              <option value="Mixed">Mixed</option>
              <option value="Alternative">Alternative</option>
              <option value="Balanced">Balanced</option>
            </select>
          </div>

          <div className="form-input-group">
            <label htmlFor="portfolioName">Portfolio Name</label>
            <input
              type="text"
              id="portfolioName"
              name="portfolioName"
              value={formData.portfolioName}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>

          <div className="form-input-group">
            <label htmlFor="portfolioCode">Portfolio Code</label>
            <input
              type="text"
              id="portfolioCode"
              name="portfolioCode"
              value={formData.portfolioCode}
              onChange={handleChange}
              placeholder="Enter code"
            />
          </div>
        </div>

        <div className="form-button-group">
          <button type="submit" className="form-btn form-btn-primary">
            Add New
          </button>
          <button type="button" onClick={handleClear} className="form-btn form-btn-secondary">
            Clear
          </button>
        </div>
      </form>

      <PortfolioGrid />
    </div>
  );
}

export default Portfolio;
