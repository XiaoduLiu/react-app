import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine, ColDef } from 'ag-grid-community';
import './DealList.css';

interface DealData {
  dealId: string;
  dealName: string;
  client: string;
  amount: number;
  status: string;
  startDate: string;
  endDate: string;
  owner: string;
}

function DealList() {
  // Sample data for the grid
  const [rowData] = useState<DealData[]>([
    { dealId: 'D001', dealName: 'Project Alpha', client: 'ABC Corp', amount: 150000, status: 'Active', startDate: '2024-01-15', endDate: '2024-12-31', owner: 'John Doe' },
    { dealId: 'D002', dealName: 'Project Beta', client: 'XYZ Inc', amount: 250000, status: 'Pending', startDate: '2024-02-01', endDate: '2025-01-31', owner: 'Jane Smith' },
    { dealId: 'D003', dealName: 'Project Gamma', client: 'Tech Solutions', amount: 180000, status: 'Active', startDate: '2024-03-10', endDate: '2024-11-30', owner: 'Bob Johnson' },
    { dealId: 'D004', dealName: 'Project Delta', client: 'Global Services', amount: 320000, status: 'Completed', startDate: '2023-06-01', endDate: '2024-05-31', owner: 'Alice Brown' },
    { dealId: 'D005', dealName: 'Project Epsilon', client: 'Innovation Labs', amount: 95000, status: 'Active', startDate: '2024-04-01', endDate: '2024-10-31', owner: 'Charlie Wilson' },
    { dealId: 'D006', dealName: 'Project Zeta', client: 'Digital Media', amount: 210000, status: 'Pending', startDate: '2024-05-15', endDate: '2025-02-28', owner: 'Diana Prince' },
    { dealId: 'D007', dealName: 'Project Eta', client: 'Smart Systems', amount: 175000, status: 'Active', startDate: '2024-01-20', endDate: '2024-12-20', owner: 'Edward Norton' },
    { dealId: 'D008', dealName: 'Project Theta', client: 'Future Tech', amount: 290000, status: 'Active', startDate: '2024-03-01', endDate: '2025-03-01', owner: 'Fiona Green' },
  ]);

  // Row style function to set background color based on status
  const getRowStyle = useMemo(() => {
    return (params: any) => {
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

  // Column definitions with 8 columns
  const columnDefs = useMemo<ColDef<DealData>[]>(() => [
    {
      field: 'dealId',
      headerName: 'Deal ID',
      flex: 1,
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
      field: 'status',
      headerName: 'Status',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1.2,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1.2,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1.3,
      filter: true,
      sortable: true
    },
  ], []);

  // Default column properties
  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    sortable: true,
    filter: true,
  }), []);

  // Create custom theme based on Alpine
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

export default DealList;
