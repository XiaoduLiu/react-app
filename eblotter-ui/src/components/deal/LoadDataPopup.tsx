import { useMemo, useState, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine, ColDef } from 'ag-grid-community';
import './LoadDataPopup.css';

interface LoadDataPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (importData: Array<{ id: string; amount: number | null }>) => void;
}

interface LoadData {
  id: string;
  amount: number | null;
}

function LoadDataPopup({ isOpen, onClose, onImport }: LoadDataPopupProps) {
  // Initialize with 10 empty rows
  const getEmptyRows = () => {
    return Array.from({ length: 10 }, () => ({
      id: '',
      amount: null
    }));
  };

  const [rowData, setRowData] = useState<LoadData[]>(getEmptyRows());

  // Handle import button click
  const handleImport = useCallback(() => {
    // Filter out empty rows (rows with no ID)
    const validData = rowData.filter(row => row.id.trim() !== '');

    if (validData.length === 0) {
      alert('No data to import. Please enter at least one ID and Amount.');
      return;
    }

    // Call the onImport callback with the valid data
    onImport(validData);

    // Reset the grid to empty state and close
    setRowData(getEmptyRows());
    onClose();
  }, [rowData, onClose, onImport]);

  // Column definitions with 2 columns: id and amount (both editable)
  const columnDefs = useMemo<ColDef<LoadData>[]>(() => [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      filter: true,
      sortable: true,
      editable: true
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      filter: 'agNumberColumnFilter',
      sortable: true,
      editable: true,
      cellDataType: 'number',
      valueFormatter: params => {
        if (params.value === null || params.value === undefined || params.value === '') {
          return '';
        }
        return `$${Number(params.value).toLocaleString()}`;
      }
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

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <div className="popup-header">
          <button className="import-button" onClick={handleImport}>
            Import
          </button>
          <h2>Load Data</h2>
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="popup-grid-wrapper">
          <AgGridReact
            theme={myTheme}
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
            animateRows={true}
            domLayout="normal"
            onCellValueChanged={(params) => {
              setRowData(params.api.getRenderedNodes().map(node => node.data));
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default LoadDataPopup;
