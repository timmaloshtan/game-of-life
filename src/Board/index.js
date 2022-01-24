import React from 'react';
import Row from './Row';

const Board = ({ board }) => {
  return (
    <div className="board-container">
      <table className="board">
        <tbody>
          {board.map((row, rowIndex) => (
            <Row row={row} rowIndex={rowIndex} key={`Row #${rowIndex}`} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default React.memo(Board);
