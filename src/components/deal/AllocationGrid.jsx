import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine } from 'ag-grid-community';
import './AllocationGrid.css';

function AllocationGrid() {
  // Sample allocation data
  const [rowData] = useState([
    { allocationId: 'A001', entity: 'Entity A', percentage: 25.5, amount: 127500, status: 'Approved', allocatedBy: 'John Doe', allocatedDate: '2024-10-15' },
    { allocationId: 'A002', entity: 'Entity B', percentage: 30.0, amount: 150000, status: 'Pending', allocatedBy: 'Jane Smith', allocatedDate: '2024-10-16' },
    { allocationId: 'A003', entity: 'Entity C', percentage: 20.0, amount: 100000, status: 'Approved', allocatedBy: 'Bob Johnson', allocatedDate: '2024-10-17' },
    { allocationId: 'A004', entity: 'Entity D', percentage: 24.5, amount: 122500, status: 'Approved', allocatedBy: 'Alice Brown', allocatedDate: '2024-10-18' },
  ]);

  // Row style function
  const getRowStyle = useMemo(() => {
    return (params) => {
      if (params.data.status === 'Approved') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.status === 'Pending') {
        return { background: '#fff3cd' }; // Light yellow
      }
      return null;
    };
  }, []);

  // Column definitions
  const columnDefs = useMemo(() => [
    {
      field: 'allocationId',
      headerName: 'Allocation ID',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'entity',
      headerName: 'Entity',
      flex: 1.5,
      filter: true,
      sortable: true
    },
    {
      field: 'percentage',
      headerName: 'Percentage (%)',
      flex: 1,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: params => `${params.value}%`
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1.2,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: params => `$${params.value.toLocaleString()}`
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'allocatedBy',
      headerName: 'Allocated By',
      flex: 1.3,
      filter: true,
      sortable: true
    },
    {
      field: 'allocatedDate',
      headerName: 'Allocated Date',
      flex: 1.2,
      filter: 'agDateColumnFilter',
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
    <div className="allocation-grid-container">
      <h3 className="grid-title">Allocation Grid</h3>
      <div className="grid-wrapper">
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
    </div>
  );
}

export default AllocationGrid;
