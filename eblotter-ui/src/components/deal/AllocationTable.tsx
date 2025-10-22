import { useState, ChangeEvent } from 'react';
import './AllocationTable.css';

interface RowData {
  col1: string;
  col2: string;
  col3: number | string;
  col4: number | string;
  col5: string;
  col6: string;
  col7: string;
  col8: string;
  col9: string;
}

function AllocationTable() {
  // Sample allocation data - only 3 rows
  const [rowData, setRowData] = useState<RowData[]>([
    { col1: 'A001', col2: 'Entity A', col3: 25.5, col4: 127500, col5: 'Type A', col6: 'Approved', col7: 'John Doe', col8: '2024-10-15', col9: 'Notes 1' },
    { col1: 'A002', col2: 'Entity B', col3: 30.0, col4: 150000, col5: 'Type B', col6: 'Pending', col7: 'Jane Smith', col8: '2024-10-16', col9: 'Notes 2' },
    { col1: 'A003', col2: 'Entity C', col3: 20.0, col4: 100000, col5: 'Type C', col6: 'Approved', col7: 'Bob Johnson', col8: '2024-10-17', col9: 'Notes 3' },
  ]);

  const handleCellChange = (rowIndex: number, colKey: keyof RowData, value: string) => {
    const updatedData = [...rowData];
    updatedData[rowIndex][colKey] = value as never;
    setRowData(updatedData);
  };

  const getRowClassName = (row: RowData): string => {
    if (row.col6 === 'Approved') {
      return 'row-approved';
    } else if (row.col6 === 'Pending') {
      return 'row-pending';
    }
    return '';
  };

  return (
    <div className="allocation-table-container">
      <div className="allocation-table-title">
        <h4>Allocation Grid</h4>
      </div>

      <div>
        <table className="allocation-table">
          <thead>
            {/* First header row - grouped headers */}
            <tr className="header-row-1">
              <th colSpan={2} className="group-header">Group 1</th>
              <th colSpan={3} className="group-header">Group 2</th>
              <th colSpan={3} className="group-header">Group 3</th>
              <th rowSpan={2} className="single-header">Column 9</th>
            </tr>
            {/* Second header row - individual column headers */}
            <tr className="header-row-2">
              <th className="column-header">Column 1</th>
              <th className="column-header">Column 2</th>
              <th className="column-header">Column 3</th>
              <th className="column-header">Column 4</th>
              <th className="column-header">Column 5</th>
              <th className="column-header">Column 6</th>
              <th className="column-header">Column 7</th>
              <th className="column-header">Column 8</th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((row, rowIndex) => (
              <tr key={rowIndex} className={getRowClassName(row)}>
                <td className="cell-readonly">{row.col1}</td>
                <td className="cell-readonly">{row.col2}</td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col3}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col3', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col4}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col4', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col5}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col5', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col6}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col6', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col7}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col7', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col8}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col8', e.target.value)}
                  />
                </td>
                <td className="cell-editable">
                  <input
                    type="text"
                    value={row.col9}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleCellChange(rowIndex, 'col9', e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllocationTable;
