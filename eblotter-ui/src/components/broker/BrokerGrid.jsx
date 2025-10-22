import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine } from 'ag-grid-community';
import './BrokerGrid.css';

function BrokerGrid() {
  // Sample broker data with 3 columns
  const [rowData] = useState([
    { brokerId: 'BR001', brokerName: 'Goldman Sachs', status: 'Active' },
    { brokerId: 'BR002', brokerName: 'Morgan Stanley', status: 'Active' },
    { brokerId: 'BR003', brokerName: 'JP Morgan', status: 'Active' },
    { brokerId: 'BR004', brokerName: 'Citigroup', status: 'Inactive' },
    { brokerId: 'BR005', brokerName: 'Bank of America', status: 'Active' },
    { brokerId: 'BR006', brokerName: 'Wells Fargo', status: 'Active' },
    { brokerId: 'BR007', brokerName: 'Credit Suisse', status: 'Inactive' },
    { brokerId: 'BR008', brokerName: 'Deutsche Bank', status: 'Active' },
    { brokerId: 'BR009', brokerName: 'Barclays', status: 'Active' },
    { brokerId: 'BR010', brokerName: 'UBS', status: 'Active' },
  ]);

  // Row style function based on status
  const getRowStyle = useMemo(() => {
    return (params) => {
      if (params.data.status === 'Active') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.status === 'Inactive') {
        return { background: '#f8d7da' }; // Light red
      }
      return null;
    };
  }, []);

  // Column definitions with 3 columns
  const columnDefs = useMemo(() => [
    {
      field: 'brokerId',
      headerName: 'Broker ID',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'brokerName',
      headerName: 'Broker Name',
      flex: 2,
      filter: true,
      sortable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      filter: true,
      sortable: true
    },
  ], []);

  // Default column properties
  const defaultColDef = useMemo(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  // Create custom theme
  const myTheme = useMemo(() => {
    return themeAlpine.withParams({
      headerBackgroundColor: '#646cff',
      headerTextColor: '#ffffff',
    });
  }, []);

  return (
    <div
      style={{
        height: '500px',
        margin: '2rem -2rem 0 -2rem',
        border: '2px solid #333',
        borderRadius: '4px',
        boxSizing: 'border-box'
      }}
    >
      <AgGridReact
        theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        getRowStyle={getRowStyle}
        animateRows={true}
        domLayout="normal"
      />
    </div>
  );
}

export default BrokerGrid;
