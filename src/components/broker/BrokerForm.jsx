import { useState } from 'react';
import './BrokerForm.css';

function BrokerForm() {
  const [formData, setFormData] = useState({
    brokerName: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddNew = (e) => {
    e.preventDefault();
    console.log('Add New clicked:', formData);
    alert('Broker added!');
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormData({
      brokerName: ''
    });
  };

  return (
    <form onSubmit={handleAddNew} className="broker-form-container">
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="brokerName">Broker Name</label>
          <input
            type="text"
            id="brokerName"
            name="brokerName"
            value={formData.brokerName}
            onChange={handleChange}
            placeholder="Enter broker name"
            maxLength="100"
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

export default BrokerForm;
