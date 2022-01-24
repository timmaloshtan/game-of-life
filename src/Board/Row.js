import React from 'react';
import Cell from './Cell';

const Row = ({ row, rowIndex }) => {
  return (
    <tr className="board-row">
      {row.map((cell, cellIndex) => (
        <Cell alive={cell} rowIndex={rowIndex} cellIndex={cellIndex} key={`Cell #${cellIndex}`} />
      ))}
    </tr>
  );
};

export default React.memo(Row);
