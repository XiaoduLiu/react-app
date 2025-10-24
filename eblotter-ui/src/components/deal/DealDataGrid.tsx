import { useMemo, useRef, useCallback, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine, ColDef, RowClassParams, CellValueChangedEvent } from 'ag-grid-community';
import './DealDataGrid.css';
import LoadDataPopup from './LoadDataPopup';
import { useDealStore } from '@/store/useDealStore';
import { DealData } from '@/types/deal';
import LoadingSpinner from '@/components/LoadingSpinner';
import { toast } from '@/utils/toast';

function DealDataGrid() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const gridRef = useRef<AgGridReact<DealData>>(null);

  // Get state and actions from Zustand store
  const { deals, isLoading, error, fetchDeals, updateDeal } = useDealStore();

  // Fetch deals on component mount
  useEffect(() => {
    fetchDeals().catch(() => {
      // Fallback to sample data if API fails
      toast.error('Failed to load deals from server. Using sample data.');
    });
  }, [fetchDeals]);

  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Export selected rows to CSV
  const handleExport = useCallback(() => {
    const api = gridRef.current?.api;
    if (!api) return;

    const selectedRows = api.getSelectedRows();
    if (selectedRows.length === 0) {
      toast.warning('Please select rows to export');
      return;
    }

    // Export selected rows to CSV
    api.exportDataAsCsv({
      onlySelected: true,
      fileName: 'deal-data-export.csv'
    });
    toast.success(`Exported ${selectedRows.length} row(s) to CSV`);
  }, []);

  // Handle import data from LoadDataPopup
  const handleImportData = useCallback(async (importData: Array<{ id: string; amount: number | null }>) => {
    let updatedCount = 0;
    const notFoundIds: string[] = [];

    // Update deals via API
    for (const importRow of importData) {
      if (importRow.id && importRow.amount !== null && importRow.amount !== undefined) {
        const deal = deals.find(d => d.id === importRow.id);
        if (deal) {
          try {
            await updateDeal(importRow.id, { amount: importRow.amount });
            updatedCount++;
          } catch (err) {
            console.error(`Failed to update deal ${importRow.id}:`, err);
          }
        } else {
          notFoundIds.push(importRow.id);
        }
      }
    }

    // Show feedback to user
    if (updatedCount > 0) {
      toast.success(`Updated ${updatedCount} record(s) successfully`);
    }

    if (notFoundIds.length > 0) {
      toast.warning(`${notFoundIds.length} ID(s) not found: ${notFoundIds.join(', ')}`);
    }
  }, [deals, updateDeal]);

  // Row style function
  const getRowStyle = useMemo(() => {
    return (params: RowClassParams<DealData>) => {
      if (!params.data) return undefined;

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

  // Handle cell value changes - keep changes locally in grid only, don't update backend
  const handleCellValueChanged = useCallback((event: CellValueChangedEvent<DealData>) => {
    if (!event.data) return;

    // Changes are kept in the grid state only
    // No API call is made to update the backend
    // You can add a separate "Save" button if you want to persist changes later
    console.log('Cell value changed:', {
      field: event.colDef.field,
      oldValue: event.oldValue,
      newValue: event.newValue,
      rowData: event.data
    });
  }, []);

  if (isLoading && deals.length === 0) {
    return <LoadingSpinner fullPage />;
  }

  return (
    <div className="deal-data-grid-container">
      <div className="grid-header">
        <button
          className="export-button"
          onClick={handleExport}
          disabled={isLoading}
        >
          Export Selected
        </button>
        <button
          className="load-data-button"
          onClick={() => setIsPopupOpen(true)}
          disabled={isLoading}
        >
          Load Data
        </button>
      </div>
      <div className="grid-wrapper">
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          rowData={deals}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          getRowStyle={getRowStyle}
          animateRows={true}
          domLayout="normal"
          rowSelection="multiple"
          suppressRowClickSelection={true}
          onCellValueChanged={handleCellValueChanged}
          loading={isLoading}
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
