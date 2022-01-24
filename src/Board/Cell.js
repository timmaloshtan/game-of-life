import React from 'react';
import { ClickContext } from '../Contexts';

const Cell = ({ alive, rowIndex, cellIndex }) => {
  const onCellClick = React.useContext(ClickContext);
  const clickHandler = React.useCallback(() => {
    onCellClick({ i: rowIndex, j: cellIndex });
  }, [rowIndex, cellIndex, onCellClick]);
  return (
    <td className="board-cell" onClick={clickHandler}>
      <div className={`cell-content${alive ? ' alive' : ''}`}></div>
    </td>
  );
};

export default React.memo(Cell);
