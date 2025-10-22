import { useState, ChangeEvent, FormEvent } from 'react';
import './DealForm.css';

interface FormData {
  securityDescription: string;
  securityIdentifier: string;
  tradeStartDate: string;
  tradeEndDate: string;
  trader: string;
}

interface Errors {
  securityDescription: string;
  securityIdentifier: string;
  tradeStartDate: string;
  tradeEndDate: string;
  trader: string;
}

function DealForm() {
  const [formData, setFormData] = useState<FormData>({
    securityDescription: '',
    securityIdentifier: '',
    tradeStartDate: '',
    tradeEndDate: '',
    trader: ''
  });

  const [errors, setErrors] = useState<Errors>({
    securityDescription: '',
    securityIdentifier: '',
    tradeStartDate: '',
    tradeEndDate: '',
    trader: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Limit to 100 characters
    if (value.length <= 100) {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));

      // Clear error when user starts typing
      if (errors[name as keyof Errors]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Errors> = {};
    let isValid = true;

    Object.keys(formData).forEach(key => {
      if (formData[key as keyof FormData].length > 100) {
        newErrors[key as keyof Errors] = 'Maximum 100 characters allowed';
        isValid = false;
      }
    });

    setErrors(newErrors as Errors);
    return isValid;
  };

  const handleSubmit1 = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submit Button 1 clicked:', formData);
      alert('Form submitted via Button 1!');
    } else {
      alert('Please correct the errors in the form');
    }
  };

  const handleSubmit2 = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateForm()) {
      console.log('Submit Button 2 clicked:', formData);
      alert('Form submitted via Button 2!');
    } else {
      alert('Please correct the errors in the form');
    }
  };

  return (
      <form onSubmit={handleSubmit1} className="form-container">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="securityDescription">Security Description</label>
            <input
              type="text"
              id="securityDescription"
              name="securityDescription"
              value={formData.securityDescription}
              onChange={handleChange}
              placeholder="Enter security description (max 100 characters)"
              maxLength={100}
              className={errors.securityDescription ? 'error' : ''}
            />
            {errors.securityDescription && <span className="error-message">{errors.securityDescription}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="tradeStartDate">Trade Start Date</label>
            <input
              type="date"
              id="tradeStartDate"
              name="tradeStartDate"
              value={formData.tradeStartDate}
              onChange={handleChange}
              className={errors.tradeStartDate ? 'error' : ''}
            />
            {errors.tradeStartDate && <span className="error-message">{errors.tradeStartDate}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="securityIdentifier">Security Identifier</label>
            <input
              type="text"
              id="securityIdentifier"
              name="securityIdentifier"
              value={formData.securityIdentifier}
              onChange={handleChange}
              placeholder="Enter security identifier (max 100 characters)"
              maxLength={100}
              className={errors.securityIdentifier ? 'error' : ''}
            />
            {errors.securityIdentifier && <span className="error-message">{errors.securityIdentifier}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="tradeEndDate">Trade End Date</label>
            <input
              type="date"
              id="tradeEndDate"
              name="tradeEndDate"
              value={formData.tradeEndDate}
              onChange={handleChange}
              className={errors.tradeEndDate ? 'error' : ''}
            />
            {errors.tradeEndDate && <span className="error-message">{errors.tradeEndDate}</span>}
          </div>

          <div className="form-field">
            <label htmlFor="trader">Trader</label>
            <select
              id="trader"
              name="trader"
              value={formData.trader}
              onChange={handleChange}
              className={errors.trader ? 'error' : ''}
            >
              <option value="">Select a trader</option>
              <option value="John Doe">John Doe</option>
              <option value="Jane Smith">Jane Smith</option>
              <option value="Bob Johnson">Bob Johnson</option>
              <option value="Alice Brown">Alice Brown</option>
              <option value="Charlie Wilson">Charlie Wilson</option>
            </select>
            {errors.trader && <span className="error-message">{errors.trader}</span>}
          </div>
        </div>

        <div className="button-group">
          <button type="submit" className="submit-btn">
            Submit Button 1
          </button>
          <button type="button" onClick={handleSubmit2} className="submit-btn">
            Submit Button 2
          </button>
        </div>
      </form>
  );
}

export default DealForm;
