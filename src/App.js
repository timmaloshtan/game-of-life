import React from 'react';
import { SizeContext, ClickContext } from './Contexts';
import Controls from './Controls';
import Board from './Board';

const init = () => {
  const board = new Array(25);

  for (let i = 0; i < 25; i++) {
    board[i] = new Array(25).fill(0);
  }

  return { board };
};

const gameReducer = (action, state) => {
  const { board: previousBoard } = state;
  const previousHeight = previousBoard.length;
  const previousWidth = previousBoard[0].length;
  switch (action.type) {
    case 'CHANGE_SIZE':
      const { height, width } = action;

      if (height < previousHeight) {
        return {
          ...state,
          board: previousBoard.slice(0, height),
        };
      }

      if (height > previousHeight) {
        return {
          ...state,
          board: [
            ...previousBoard,
            ...Array(height - previousHeight)
              .fill(0)
              .map(() => Array(previousWidth).fill(0)),
          ],
        };
      }

      if (width < previousWidth) {
        return {
          ...state,
          board: previousBoard.map((row) => row.slice(0, width)),
        };
      }

      if (width > previousWidth) {
        return {
          ...state,
          board: [
            ...previousBoard.map((row) => [...row].concat(Array(width - previousWidth).fill(0))),
          ],
        };
      }
      return state;
    case 'TOGGLE_CELL':
      const { i, j } = action;
      const previousRow = previousBoard[i];
      return {
        ...state,
        board: [
          ...previousBoard.slice(0, i),
          [...previousRow.slice(0, j), previousRow[j] === 0 ? 1 : 0, ...previousRow.slice(j + 1)],
          ...previousBoard.slice(i + 1),
        ],
      };
    case 'POPULATE':
      const newBoard = [];

      for (let i = 0; i < previousHeight; i++) {
        newBoard[i] = [];

        for (let j = 0; j < previousWidth; j++) {
          newBoard[i][j] = Math.random() < 0.1 ? 1 : 0;
        }
      }

      return {
        ...state,
        board: newBoard,
      };
    default:
      return state;
  }
};

function App() {
  const [board, setBoard] = React.useState(() => {
    const matrix = new Array(25);

    for (let i = 0; i < 25; i++) {
      matrix[i] = new Array(25).fill(0);
    }

    return matrix;
  });

  const onSizeChange = React.useCallback(
    ({ height, width }) => {
      setBoard((previousBoard) => {
        const previousHeight = previousBoard.length;
        const previousWidth = previousBoard[0].length;
        if (height < previousHeight) {
          return previousBoard.slice(0, height);
        }

        if (height > previousHeight) {
          return [
            ...previousBoard,
            ...Array(height - previousHeight)
              .fill(0)
              .map((element) => Array(previousWidth).fill(0)),
          ];
        }

        if (width < previousWidth) {
          return previousBoard.map((row) => row.slice(0, width));
        }

        if (width > previousWidth) {
          return [
            ...previousBoard.map((row) => [...row].concat(Array(width - previousWidth).fill(0))),
          ];
        }
        return previousBoard;
      });
    },
    [setBoard],
  );

  const onCellClick = React.useCallback(
    ({ i, j }) => {
      setBoard((previousBoard) => {
        const previousRow = previousBoard[i];
        return [
          ...previousBoard.slice(0, i),
          [...previousRow.slice(0, j), previousRow[j] === 0 ? 1 : 0, ...previousRow.slice(j + 1)],
          ...previousBoard.slice(i + 1),
        ];
      });
    },
    [setBoard],
  );

  const populate = React.useCallback(() => {
    setBoard((previousBoard) => {
      const previousHeight = previousBoard.length;
      const previousWidth = previousBoard[0].length;

      const newBoard = [];

      for (let i = 0; i < previousHeight; i++) {
        newBoard[i] = [];

        for (let j = 0; j < previousWidth; j++) {
          newBoard[i][j] = Math.random() < 0.1 ? 1 : 0;
        }
      }

      return newBoard;
    });
  }, [setBoard]);

  return (
    <div className="App">
      <SizeContext.Provider
        value={{
          height: board.length,
          width: board[0].length,
          onSizeChange,
          populate,
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
