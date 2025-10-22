import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine } from 'ag-grid-community';
import './DealDataGrid.css';

function DealDataGrid() {
  // Sample data for the grid with 10 columns
  const [rowData] = useState([
    {
      id: 'DD001',
      dealName: 'Project Alpha',
      client: 'ABC Corp',
      amount: 500000,
      currency: 'USD',
      status: 'Active',
      startDate: '2024-01-15',
      endDate: '2024-12-31',
      owner: 'John Doe',
      region: 'North America'
    },
    {
      id: 'DD002',
      dealName: 'Project Beta',
      client: 'XYZ Inc',
      amount: 750000,
      currency: 'EUR',
      status: 'Pending',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      owner: 'Jane Smith',
      region: 'Europe'
    },
    {
      id: 'DD003',
      dealName: 'Project Gamma',
      client: 'Tech Solutions',
      amount: 320000,
      currency: 'USD',
      status: 'Active',
      startDate: '2024-03-10',
      endDate: '2024-11-30',
      owner: 'Bob Johnson',
      region: 'North America'
    },
    {
      id: 'DD004',
      dealName: 'Project Delta',
      client: 'Global Services',
      amount: 920000,
      currency: 'GBP',
      status: 'Completed',
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      owner: 'Alice Brown',
      region: 'Europe'
    },
    {
      id: 'DD005',
      dealName: 'Project Epsilon',
      client: 'Innovation Labs',
      amount: 280000,
      currency: 'USD',
      status: 'Active',
      startDate: '2024-04-01',
      endDate: '2024-10-31',
      owner: 'Charlie Wilson',
      region: 'Asia Pacific'
    },
    {
      id: 'DD006',
      dealName: 'Project Zeta',
      client: 'Digital Media',
      amount: 650000,
      currency: 'EUR',
      status: 'Pending',
      startDate: '2024-05-15',
      endDate: '2025-02-28',
      owner: 'Diana Prince',
      region: 'Europe'
    },
  ]);

  // Row style function
  const getRowStyle = useMemo(() => {
    return (params) => {
      if (params.data.status === 'Active') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.status === 'Pending') {
        return { background: '#fff3cd' }; // Light yellow
      } else if (params.data.status === 'Completed') {
        return { background: '#d1ecf1' }; // Light blue
      }
      return null;
    };
  }, []);

  // Column definitions with 10 columns
  const columnDefs = useMemo(() => [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.8,
      filter: true,
      sortable: true
    },
    {
      field: 'dealName',
      headerName: 'Deal Name',
      flex: 1.5,
      filter: true,
      sortable: true
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1.3,
      filter: true,
      sortable: true
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
      field: 'currency',
      headerName: 'Currency',
      flex: 0.8,
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
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1.1,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1.1,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1.2,
      filter: true,
      sortable: true
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1.3,
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
    <div className="deal-data-grid-container">
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

export default DealDataGrid;
