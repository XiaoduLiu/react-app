import AllocationForm from '../components/deal/AllocationForm';
import AllocationTable from '../components/deal/AllocationTable';
import DealDataGrid from '../components/deal/DealDataGrid';
import './Deal.css';

function Deal() {
  return (
    <div className="deal-page">
      <div className="header-bar">
        <h4>Deal Management</h4>
      </div>
      <AllocationForm />
      <AllocationTable />
      <DealDataGrid />
    </div>
  );
}

export default Deal;
