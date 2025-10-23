import { useMemo, useState, useRef, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine, ColDef } from 'ag-grid-community';
import type { GridApi } from 'ag-grid-community';
import './DealDataGrid.css';
import LoadDataPopup from './LoadDataPopup';

interface DealData {
  id: string;
  dealName: string;
  client: string;
  amount: number;
  currency: string;
  status: string;
  startDate: string;
  endDate: string;
  owner: string;
  region: string;
}

function DealDataGrid() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const gridRef = useRef<AgGridReact<DealData>>(null);

  // Export selected rows to CSV
  const handleExport = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;

    const selectedRows = api.getSelectedRows();
    if (selectedRows.length === 0) {
      alert('Please select rows to export');
      return;
    }

    // Export selected rows to CSV
    api.exportDataAsCsv({
      onlySelected: true,
      fileName: 'deal-data-export.csv'
    });
  }, []);

  // Sample data for the grid with 10 columns
  const [rowData, setRowData] = useState<DealData[]>([
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

  // Handle import data from LoadDataPopup
  const handleImportData = useCallback((importData: Array<{ id: string; amount: number | null }>) => {
    let updatedCount = 0;
    let notFoundIds: string[] = [];

    // Create a new copy of rowData to update
    const updatedRowData = rowData.map(dealRow => {
      // Find matching row in import data
      const importRow = importData.find(row => row.id === dealRow.id);

      if (importRow && importRow.amount !== null && importRow.amount !== undefined) {
        updatedCount++;
        return {
          ...dealRow,
          amount: importRow.amount
        };
      }

      return dealRow;
    });

    // Check for IDs in import data that weren't found in deal data
    importData.forEach(importRow => {
      if (importRow.id && importRow.amount !== null && importRow.amount !== undefined) {
        const found = rowData.some(dealRow => dealRow.id === importRow.id);
        if (!found) {
          notFoundIds.push(importRow.id);
        }
      }
    });

    // Update the grid data
    setRowData(updatedRowData);

    // Show feedback to user
    let message = `Import completed!\n\n`;
    message += `✓ ${updatedCount} record(s) updated successfully.`;

    if (notFoundIds.length > 0) {
      message += `\n\n⚠ ${notFoundIds.length} ID(s) not found in Deal Data Grid:\n${notFoundIds.join(', ')}`;
    }

    alert(message);
  }, [rowData]);

  // Row style function
  const getRowStyle = useMemo(() => {
    return (params: any) => {
      if (params.data.status === 'Active') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.status === 'Pending') {
        return { background: '#fff3cd' }; // Light yellow
      } else if (params.data.status === 'Completed') {
        return { background: '#d1ecf1' }; // Light blue
      }
      return undefined;
    };
  }, []);

  // Column definitions with 10 columns (all editable)
  const columnDefs = useMemo<ColDef<DealData>[]>(() => [
    {
      field: 'id',
      headerName: 'ID',
      flex: 0.8,
      filter: true,
      sortable: true,
      editable: true,
      checkboxSelection: true,
      headerCheckboxSelection: true
    },
    {
      field: 'dealName',
      headerName: 'Deal Name',
      flex: 1.5,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'client',
      headerName: 'Client',
      flex: 1.3,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1.2,
      filter: 'agNumberColumnFilter',
      sortable: true,
      editable: true,
      cellDataType: 'number',
      valueFormatter: params => `$${params.value.toLocaleString()}`
    },
    {
      field: 'currency',
      headerName: 'Currency',
      flex: 0.8,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'startDate',
      headerName: 'Start Date',
      flex: 1.1,
      filter: 'agDateColumnFilter',
      sortable: true,
      editable: true
    },
    {
      field: 'endDate',
      headerName: 'End Date',
      flex: 1.1,
      filter: 'agDateColumnFilter',
      sortable: true,
      editable: true
    },
    {
      field: 'owner',
      headerName: 'Owner',
      flex: 1.2,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'region',
      headerName: 'Region',
      flex: 1.3,
      filter: true,
      sortable: true,
      editable: true
    },
  ], []);

  // Default column properties
  const defaultColDef = useMemo<ColDef>(() => ({
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
      <div className="grid-header">
        <button
          className="export-button"
          onClick={handleExport}
        >
          Export Selected
        </button>
        <button
          className="load-data-button"
          onClick={() => setIsPopupOpen(true)}
        >
          Load Data
        </button>
      </div>
      <div className="grid-wrapper">
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowStyle={getRowStyle}
          animateRows={true}
          domLayout="normal"
          rowSelection="multiple"
          suppressRowClickSelection={true}
          onCellValueChanged={(params) => {
            setRowData(params.api.getRenderedNodes().map(node => node.data));
          }}
        />
      </div>
      <LoadDataPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onImport={handleImportData}
      />
    </div>
  );
}

export default DealDataGrid;
