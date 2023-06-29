import React from "react";
import { Table } from "reactstrap";

const RecursiveTable = ({ data, excludedColumns, children }) => {
  //   const excludedColumns = ["groups", "equipaments"];

  const renderTableHeaders = (obj) => {
    return (
      <thead>
        <tr>
          {Object.keys(obj).map((key) => {
            if (!excludedColumns.includes(key)) {
              return <th key={key}>{key}</th>;
            }
            return null;
          })}
        </tr>
      </thead>
    );
  };

  const renderTableRows = (obj) => {
    const keys = Object.keys(obj).filter(
      (key) => !excludedColumns.includes(key)
    );
    const values = Object.values(obj).filter(
      (value, index) => !excludedColumns.includes(keys[index])
    );

    const maxRows = Math.max(
      ...values.map((value) => (Array.isArray(value) ? value.length : 1))
    );
    const rows = [];

    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
      const cells = keys.map((key, columnIndex) => {
        const value = values[columnIndex];
        const cellValue = Array.isArray(value) ? value[rowIndex] : value;
        return <td key={`${key}-${rowIndex}`}>{cellValue}</td>;
      });

      rows.push(<tr key={rowIndex}>{cells}</tr>);
    }

    return <tbody>{rows}</tbody>;
  };

  return (
    <Table hover>
      {renderTableHeaders(data)}
      {renderTableRows(data)}
      {children}
    </Table>
  );
};

export default RecursiveTable;
