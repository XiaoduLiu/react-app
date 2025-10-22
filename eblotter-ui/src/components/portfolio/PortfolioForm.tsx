import { useState, ChangeEvent, FormEvent } from 'react';
import './PortfolioForm.css';

interface FormData {
  portfolioType: string;
  portfolioName: string;
  portfolioCode: string;
}

function PortfolioForm() {
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
    <form onSubmit={handleAddNew} className="portfolio-form-container">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="portfolioType">Portfolio Type</label>
          <select
            id="portfolioType"
            name="portfolioType"
            value={formData.portfolioType}
            onChange={handleChange}
          >
            <option value="">Select portfolio type</option>
            <option value="Equity">Equity</option>
            <option value="Fixed Income">Fixed Income</option>
            <option value="Mixed">Mixed</option>
            <option value="Alternative">Alternative</option>
            <option value="Balanced">Balanced</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="portfolioName">Portfolio Name</label>
          <input
            type="text"
            id="portfolioName"
            name="portfolioName"
            value={formData.portfolioName}
            onChange={handleChange}
            placeholder="Enter portfolio name"
            maxLength={100}
          />
        </div>

        <div className="form-field">
          <label htmlFor="portfolioCode">Portfolio Code</label>
          <input
            type="text"
            id="portfolioCode"
            name="portfolioCode"
            value={formData.portfolioCode}
            onChange={handleChange}
            placeholder="Enter portfolio code"
            maxLength={100}
          />
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="submit-btn">
          Add New
        </button>
        <button type="button" onClick={handleClear} className="submit-btn">
          Clear
        </button>
      </div>
    </form>
  );
}

export default PortfolioForm;
