import React from "react";
import { Table } from "reactstrap";

const RecursiveTable = ({ data, excludedColumns, children }) => {
  excludedColumns.push("_id");

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
          <th>Edit</th>
        </tr>
      </thead>
    );
  };

  const renderTableCell = (value) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => {
        if (typeof item === "object" && item !== null) {
          return (
            <td key={index}>
              <RecursiveTable data={item} excludedColumns={[]} />
            </td>
          );
        } else {
          return <td key={index}>{item}</td>;
        }
      });
    } else if (typeof value === "object" && value !== null) {
      return (
        <td colSpan={Object.keys(value).length}>
          <RecursiveTable data={value} excludedColumns={[]} />
        </td>
      );
    } else {
      return <td>{value}</td>;
    }
  };

  const renderTableRows = (obj) => {
    if (typeof obj !== "object" || obj === null) {
      return <tbody></tbody>;
    }

    const keys = Object.keys(obj).filter((key) => !excludedColumns.includes(key));
    const values = Object.values(obj).filter((value, index) => !excludedColumns.includes(keys[index]));

    const maxRows = Math.max(...values.map((value) => (Array.isArray(value) ? value.length : 1)));
    const rows = [];

    for (let rowIndex = 0; rowIndex < maxRows; rowIndex++) {
      const cells = keys.map((key, columnIndex) => {
        const value = values[columnIndex];
        const cellValue = Array.isArray(value) ? value[rowIndex] : value;
        return renderTableCell(cellValue);
      });

      cells.push(<td key="edit-cell">{children}</td>);

      rows.push(<tr key={rowIndex}>{cells}</tr>);
    }

    return <tbody>{rows}</tbody>;
  };

  return (
    <Table bordered>
      {renderTableHeaders(data)}
      {renderTableRows(data)}
    </Table>
  );
};

export default RecursiveTable;
