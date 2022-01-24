import React from 'react';

const init = () => {
  const board = new Array(25);

  for (let i = 0; i < 25; i++) {
    board[i] = new Array(25).fill(0);
  }

  return { board };
};

const toggleCell = (board, i, j) => {
  const row = board[i];

  return [
    ...board.slice(0, i),
    [...row.slice(0, j), row[j] === 0 ? 1 : 0, ...row.slice(j + 1)],
    ...board.slice(i + 1),
  ];
};

const countAliveNeighbours = (board, x, y) => {
  const height = board.length;
  const width = board[0].length;
  let sum = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (i === x && j === y) continue;

      if (i < 0 || j < 0) continue;

      if (i > height - 1 || j > width - 1) continue;

      sum += board[i][j];
    }
  }

  return sum;
};

const gameReducer = (state, action) => {
  const { board: previousBoard } = state;
  const previousHeight = previousBoard.length;
  const previousWidth = previousBoard[0].length;
  switch (action.type) {
    case 'RESIZE':
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
      return {
        ...state,
        board: toggleCell(previousBoard, i, j),
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
    case 'TICK':
      let board = previousBoard;

      for (let i = 0; i < previousHeight; i++) {
        for (let j = 0; j < previousWidth; j++) {
          const isAlive = previousBoard[i][j];
          const aliveNeighbours = countAliveNeighbours(previousBoard, i, j);

          console.log('isAlive :>> ', isAlive);
          console.log('aliveNeighbours :>> ', aliveNeighbours);

          if (isAlive && aliveNeighbours < 2) {
            board = toggleCell(board, i, j);
          }

          if (isAlive && (aliveNeighbours === 2 || aliveNeighbours === 3)) continue;

          if (isAlive && aliveNeighbours > 2) {
            board = toggleCell(board, i, j);
          }

          if (!isAlive && aliveNeighbours === 3) {
            board = toggleCell(board, i, j);
          }
        }
      }
      return {
        ...state,
        board,
      };
    default:
      return state;
  }
};

export const useGameReducer = () => React.useReducer(gameReducer, {}, init);
