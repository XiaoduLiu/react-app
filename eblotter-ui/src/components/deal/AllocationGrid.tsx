import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine, ColDef } from 'ag-grid-community';
import './AllocationGrid.css';

interface AllocationData {
  col1: string;
  col2: string;
  col3: number;
  col4: number;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  col9: string;
  status?: string;
}

function AllocationGrid() {
  // Sample allocation data - only 3 rows
  const [rowData] = useState<AllocationData[]>([
    { col1: 'A001', col2: 'Entity A', col3: 25.5, col4: 127500, col5: 'Type A', col6: 'Approved', col7: 'John Doe', col8: '2024-10-15', col9: 'Notes 1' },
    { col1: 'A002', col2: 'Entity B', col3: 30.0, col4: 150000, col5: 'Type B', col6: 'Pending', col7: 'Jane Smith', col8: '2024-10-16', col9: 'Notes 2' },
    { col1: 'A003', col2: 'Entity C', col3: 20.0, col4: 100000, col5: 'Type C', col6: 'Approved', col7: 'Bob Johnson', col8: '2024-10-17', col9: 'Notes 3' },
  ]);

  // Row style function
  const getRowStyle = useMemo(() => {
    return (params: any) => {
      if (params.data.status === 'Approved') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.status === 'Pending') {
        return { background: '#fff3cd' }; // Light yellow
      }
      return null;
    };
  }, []);

  // Column definitions with 9 columns and grouped headers
  const columnDefs = useMemo<ColDef<AllocationData>[]>(() => [
    {
      headerName: 'Group 1',
      children: [
        {
          field: 'col1',
          headerName: 'Column 1',
          flex: 1,
          editable: false
        },
        {
          field: 'col2',
          headerName: 'Column 2',
          flex: 1,
          editable: false
        }
      ]
    },
    {
      headerName: 'Group 2',
      children: [
        {
          field: 'col3',
          headerName: 'Column 3',
          flex: 1,
          editable: true
        },
        {
          field: 'col4',
          headerName: 'Column 4',
          flex: 1,
          editable: true
        },
        {
          field: 'col5',
          headerName: 'Column 5',
          flex: 1,
          editable: true
        }
      ]
    },
    {
      headerName: 'Group 3',
      children: [
        {
          field: 'col6',
          headerName: 'Column 6',
          flex: 1,
          editable: true
        },
        {
          field: 'col7',
          headerName: 'Column 7',
          flex: 1,
          editable: true
        },
        {
          field: 'col8',
          headerName: 'Column 8',
          flex: 1,
          editable: true
        }
      ]
    },
    {
      field: 'col9',
      headerName: 'Column 9',
      flex: 1,
      editable: true
    }
  ], []);

  // Default column properties
  const defaultColDef = useMemo<ColDef>(() => ({
    resizable: true,
    sortable: false,
    filter: false,
    suppressMovable: true,
    lockPosition: true,
    headerClass: 'center-header'
  }), []);

  // Create custom theme
  const myTheme = useMemo(() => {
    return themeAlpine;
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
          suppressMenuHide={true}
          suppressColumnVirtualisation={true}
        />
      </div>
    </div>
  );
}

export default AllocationGrid;
