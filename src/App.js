import React from 'react';
import { SizeContext, ClickContext } from './Contexts';
import Controls from './Controls';
import Board from './Board';
import { useGameReducer } from './useGameReducer';

function App() {
  const [{ board }, dispatch] = useGameReducer();

  const onResize = React.useCallback(
    ({ height, width }) => {
      dispatch({
        type: 'RESIZE',
        height,
        width,
      });
    },
    [dispatch],
  );

  const onCellClick = React.useCallback(
    ({ i, j }) => {
      dispatch({
        type: 'TOGGLE_CELL',
        i,
        j,
      });
    },
    [dispatch],
  );

  const populateBoard = React.useCallback(() => {
    dispatch({ type: 'POPULATE' });
  }, [dispatch]);

  const tickOnce = React.useCallback(() => {
    dispatch({ type: 'TICK' });
  }, [dispatch]);

  return (
    <div className="App">
      <SizeContext.Provider
        value={{
          height: board.length,
          width: board[0].length,
          onResize,
          populateBoard,
          tickOnce,
        }}>
        <Controls />
      </SizeContext.Provider>
      <ClickContext.Provider value={onCellClick}>
        <Board board={board} />
      </ClickContext.Provider>
    </div>
  );
}

export default React.memo(App);
