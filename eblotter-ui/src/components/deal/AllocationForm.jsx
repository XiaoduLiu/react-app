import { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import './AllocationForm.css';

function AllocationForm() {
  const [formData, setFormData] = useState({
    // Section 1 - 6 fields
    dealCircle: '',
    descOfSecurity: '',
    allocationType: '',
    circleDate: '',
    isAddOn: false,
    circleNotes: '',
    // Section 2 - 9 fields
    dealAllocation: '',
    allocationDate: '',
    allocationRounding: '',
    cusip: '',
    trader: '',
    broker: '',
    executionDate: '',
    executionReason: '',
    executionNotes: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Allocation form submitted:', formData);
    alert('Allocation submitted!');
  };

  const handleClear = (e) => {
    e.preventDefault();
    setFormData({
      dealCircle: '',
      descOfSecurity: '',
      allocationType: '',
      circleDate: '',
      isAddOn: false,
      circleNotes: '',
      dealAllocation: '',
      allocationDate: '',
      allocationRounding: '',
      cusip: '',
      trader: '',
      broker: '',
      executionDate: '',
      executionReason: '',
      executionNotes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="allocation-form-container">
      {/* Section 1 - 6 fields */}
      <div className="form-section">
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="dealCircle">Deal Circle</label>
            <input
              type="text"
              id="dealCircle"
              name="dealCircle"
              value={formData.dealCircle}
              readOnly
              placeholder="Not editable"
            />
          </div>

          <div className="form-field">
            <label htmlFor="descOfSecurity">Desc of Security</label>
            <input
              type="text"
              id="descOfSecurity"
              name="descOfSecurity"
              value={formData.descOfSecurity}
              onChange={handleChange}
              placeholder="Enter description of security"
            />
          </div>

          <div className="form-field">
            <label htmlFor="allocationType">Allocation Type</label>
            <input
              type="text"
              id="allocationType"
              name="allocationType"
              value={formData.allocationType}
              onChange={handleChange}
              placeholder="Enter allocation type"
            />
          </div>

          <div className="form-field">
            <label htmlFor="circleDate">Circle Date</label>
            <input
              type="date"
              id="circleDate"
              name="circleDate"
              value={formData.circleDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field checkbox-field">
            <label htmlFor="isAddOn">Is Add-On</label>
            <input
              type="checkbox"
              id="isAddOn"
              name="isAddOn"
              checked={formData.isAddOn}
              onChange={handleChange}
            />
          </div>

          <div className="form-field two-column-field">
            <label htmlFor="circleNotes">Circle Notes</label>
            <textarea
              id="circleNotes"
              name="circleNotes"
              value={formData.circleNotes}
              onChange={handleChange}
              placeholder="Enter circle notes"
              rows="3"
            />
          </div>

        </div>
      </div>

      <div className="form-divider"></div>

      {/* Section 2 - 9 fields */}
      <div className="form-section">
        <div className="form-grid">

          <div className="form-field">
            <label htmlFor="dealAllocation">Deal Allocation</label>
            <input
              type="number"
              id="dealAllocation"
              name="dealAllocation"
              value={formData.dealAllocation}
              onChange={handleChange}
              placeholder="Enter deal allocation"
            />
          </div>

          <div className="form-field">
            <label htmlFor="allocationDate">Allocation Date</label>
            <input
              type="date"
              id="allocationDate"
              name="allocationDate"
              value={formData.allocationDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="allocationRounding">Allocation Rounding</label>
            <input
              type="number"
              id="allocationRounding"
              name="allocationRounding"
              value={formData.allocationRounding}
              onChange={handleChange}
              placeholder="Enter allocation rounding"
            />
          </div>

          <div className="form-field">
            <label htmlFor="cusip">CUSIP</label>
            <input
              type="text"
              id="cusip"
              name="cusip"
              value={formData.cusip}
              onChange={handleChange}
              placeholder="Enter CUSIP"
            />
          </div>

          <div className="form-field">
            <label htmlFor="trader">Trader</label>
            <select
              id="trader"
              name="trader"
              value={formData.trader}
              onChange={handleChange}
            >
              <option value="">Select trader</option>
              <option value="Trader A">Trader A</option>
              <option value="Trader B">Trader B</option>
              <option value="Trader C">Trader C</option>
              <option value="Trader D">Trader D</option>
              <option value="Trader E">Trader E</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="broker">Broker</label>
            <select
              id="broker"
              name="broker"
              value={formData.broker}
              onChange={handleChange}
            >
              <option value="">Select broker</option>
              <option value="Broker A">Broker A</option>
              <option value="Broker B">Broker B</option>
              <option value="Broker C">Broker C</option>
              <option value="Broker D">Broker D</option>
              <option value="Broker E">Broker E</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="executionDate">Execution Date</label>
            <input
              type="date"
              id="executionDate"
              name="executionDate"
              value={formData.executionDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="executionReason">Execution Reason</label>
            <select
              id="executionReason"
              name="executionReason"
              value={formData.executionReason}
              onChange={handleChange}
            >
              <option value="">Select execution reason</option>
              <option value="Market Order">Market Order</option>
              <option value="Limit Order">Limit Order</option>
              <option value="Stop Loss">Stop Loss</option>
              <option value="Rebalancing">Rebalancing</option>
              <option value="Client Request">Client Request</option>
            </select>
          </div>

          <div className="form-field two-column-field">
            <label htmlFor="executionNotes">Execution Notes</label>
            <textarea
              id="executionNotes"
              name="executionNotes"
              value={formData.executionNotes}
              onChange={handleChange}
              placeholder="Enter execution notes"
              rows="3"
            />
          </div>
        </div>
      </div>

      <div className="button-group">
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <button type="button" onClick={handleClear} className="submit-btn">
          Clear
        </button>
      </div>
    </form>
  );
}

export default AllocationForm;
