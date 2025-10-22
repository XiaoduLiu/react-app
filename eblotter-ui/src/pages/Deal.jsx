import AllocationForm from '../components/deal/AllocationForm';
import AllocationGrid from '../components/deal/AllocationGrid';
import DealDataGrid from '../components/deal/DealDataGrid';
import './Deal.css';

function Deal() {
  return (
    <div className="deal-page">
      <div className="header-bar">
        <h4>Deal Management</h4>
      </div>
      <AllocationForm />
      <AllocationGrid />
      <DealDataGrid />
    </div>
  );
}

export default Deal;
