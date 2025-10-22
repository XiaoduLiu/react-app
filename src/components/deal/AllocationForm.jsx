import { useState } from 'react';
import './AllocationForm.css';

function AllocationForm() {
  const [formData, setFormData] = useState({
    // Section 1 - 6 fields
    dealId: '',
    dealName: '',
    client: '',
    dealType: '',
    startDate: '',
    endDate: '',
    // Section 2 - 9 fields
    amount: '',
    currency: '',
    status: '',
    owner: '',
    region: '',
    industry: '',
    riskLevel: '',
    approver: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      dealId: '',
      dealName: '',
      client: '',
      dealType: '',
      startDate: '',
      endDate: '',
      amount: '',
      currency: '',
      status: '',
      owner: '',
      region: '',
      industry: '',
      riskLevel: '',
      approver: '',
      notes: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="allocation-form-container">
      {/* Section 1 - 6 fields */}
      <div className="form-section">
        <h3 className="section-title">Allocation Information</h3>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="dealId">Deal ID</label>
            <input
              type="text"
              id="dealId"
              name="dealId"
              value={formData.dealId}
              onChange={handleChange}
              placeholder="Enter deal ID"
            />
          </div>

          <div className="form-field">
            <label htmlFor="dealName">Deal Name</label>
            <input
              type="text"
              id="dealName"
              name="dealName"
              value={formData.dealName}
              onChange={handleChange}
              placeholder="Enter deal name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="client">Client</label>
            <input
              type="text"
              id="client"
              name="client"
              value={formData.client}
              onChange={handleChange}
              placeholder="Enter client name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="dealType">Deal Type</label>
            <select
              id="dealType"
              name="dealType"
              value={formData.dealType}
              onChange={handleChange}
            >
              <option value="">Select deal type</option>
              <option value="New Business">New Business</option>
              <option value="Renewal">Renewal</option>
              <option value="Expansion">Expansion</option>
              <option value="Upsell">Upsell</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-field">
            <label htmlFor="endDate">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      {/* Section 2 - 9 fields */}
      <div className="form-section">
        <h3 className="section-title">Allocation Details</h3>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Enter amount"
            />
          </div>

          <div className="form-field">
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleChange}
            >
              <option value="">Select currency</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="owner">Owner</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Enter owner name"
            />
          </div>

          <div className="form-field">
            <label htmlFor="region">Region</label>
            <select
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
            >
              <option value="">Select region</option>
              <option value="North America">North America</option>
              <option value="Europe">Europe</option>
              <option value="Asia Pacific">Asia Pacific</option>
              <option value="Latin America">Latin America</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="industry">Industry</label>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="Enter industry"
            />
          </div>

          <div className="form-field">
            <label htmlFor="riskLevel">Risk Level</label>
            <select
              id="riskLevel"
              name="riskLevel"
              value={formData.riskLevel}
              onChange={handleChange}
            >
              <option value="">Select risk level</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="approver">Approver</label>
            <input
              type="text"
              id="approver"
              name="approver"
              value={formData.approver}
              onChange={handleChange}
              placeholder="Enter approver name"
            />
          </div>

          <div className="form-field full-width">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter additional notes"
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
