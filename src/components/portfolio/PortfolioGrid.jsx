import { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { themeAlpine } from 'ag-grid-community';
import './PortfolioGrid.css';

function PortfolioGrid() {
  // Sample portfolio data with 9 columns
  const [rowData] = useState([
    {
      portfolioId: 'PF001',
      portfolioName: 'Growth Fund Alpha',
      manager: 'John Doe',
      strategy: 'Growth',
      totalValue: 5250000,
      currency: 'USD',
      inceptionDate: '2020-01-15',
      riskProfile: 'High',
      performance: 12.5
    },
    {
      portfolioId: 'PF002',
      portfolioName: 'Income Plus',
      manager: 'Jane Smith',
      strategy: 'Income',
      totalValue: 3800000,
      currency: 'USD',
      inceptionDate: '2019-06-20',
      riskProfile: 'Low',
      performance: 6.2
    },
    {
      portfolioId: 'PF003',
      portfolioName: 'Balanced Portfolio',
      manager: 'Bob Johnson',
      strategy: 'Balanced',
      totalValue: 4500000,
      currency: 'EUR',
      inceptionDate: '2021-03-10',
      riskProfile: 'Medium',
      performance: 8.7
    },
    {
      portfolioId: 'PF004',
      portfolioName: 'Value Opportunities',
      manager: 'Alice Brown',
      strategy: 'Value',
      totalValue: 6200000,
      currency: 'GBP',
      inceptionDate: '2018-09-05',
      riskProfile: 'Medium',
      performance: 10.3
    },
    {
      portfolioId: 'PF005',
      portfolioName: 'Aggressive Growth',
      manager: 'Charlie Wilson',
      strategy: 'Aggressive',
      totalValue: 2900000,
      currency: 'USD',
      inceptionDate: '2022-01-12',
      riskProfile: 'Very High',
      performance: 15.8
    },
    {
      portfolioId: 'PF006',
      portfolioName: 'Conservative Fund',
      manager: 'Diana Prince',
      strategy: 'Income',
      totalValue: 4100000,
      currency: 'EUR',
      inceptionDate: '2019-11-25',
      riskProfile: 'Low',
      performance: 5.5
    },
    {
      portfolioId: 'PF007',
      portfolioName: 'Diversified Portfolio',
      manager: 'Edward Norton',
      strategy: 'Balanced',
      totalValue: 5700000,
      currency: 'USD',
      inceptionDate: '2020-07-18',
      riskProfile: 'Medium',
      performance: 9.1
    },
    {
      portfolioId: 'PF008',
      portfolioName: 'Tech Growth Fund',
      manager: 'Fiona Green',
      strategy: 'Growth',
      totalValue: 3500000,
      currency: 'USD',
      inceptionDate: '2021-05-22',
      riskProfile: 'High',
      performance: 14.2
    },
  ]);

  // Row style function based on risk profile
  const getRowStyle = useMemo(() => {
    return (params) => {
      if (params.data.riskProfile === 'Low') {
        return { background: '#d4edda' }; // Light green
      } else if (params.data.riskProfile === 'Medium') {
        return { background: '#fff3cd' }; // Light yellow
      } else if (params.data.riskProfile === 'High' || params.data.riskProfile === 'Very High') {
        return { background: '#f8d7da' }; // Light red
      }
      return null;
    };
  }, []);

  // Column definitions with 9 columns
  const columnDefs = useMemo(() => [
    {
      field: 'portfolioId',
      headerName: 'Portfolio ID',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'portfolioName',
      headerName: 'Portfolio Name',
      flex: 1.5,
      filter: true,
      sortable: true
    },
    {
      field: 'manager',
      headerName: 'Manager',
      flex: 1.2,
      filter: true,
      sortable: true
    },
    {
      field: 'strategy',
      headerName: 'Strategy',
      flex: 1,
      filter: true,
      sortable: true
    },
    {
      field: 'totalValue',
      headerName: 'Total Value',
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
      field: 'inceptionDate',
      headerName: 'Inception Date',
      flex: 1.2,
      filter: 'agDateColumnFilter',
      sortable: true
    },
    {
      field: 'riskProfile',
      headerName: 'Risk Profile',
      flex: 1.1,
      filter: true,
      sortable: true
    },
    {
      field: 'performance',
      headerName: 'Performance (%)',
      flex: 1.1,
      filter: 'agNumberColumnFilter',
      sortable: true,
      valueFormatter: params => `${params.value}%`
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

export default PortfolioGrid;
