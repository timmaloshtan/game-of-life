import React from 'react';
import { SizeContext } from '../Contexts';

const Controls = () => {
  const { height, width, onSizeChange, populate } = React.useContext(SizeContext);
  const changeHandler = React.useCallback(
    (event) => {
      onSizeChange({
        height,
        width,
        [event.target.id]: event.target.value,
      });
    },
    [height, width, onSizeChange],
  );
  return (
    <div className="Controls">
      <div className="slider-container">
        <label htmlFor="height"> Height: {height} </label>{' '}
        <input
          type="range"
          min="1"
          max="50"
          value={height}
          id="height"
          className="slider"
          onChange={changeHandler}
        />{' '}
      </div>{' '}
      <div className="slider-container">
        <label htmlFor="width"> Width: {width} </label>{' '}
        <input
          type="range"
          min="1"
          max="50"
          value={width}
          id="width"
          className="slider"
          onChange={changeHandler}
        />{' '}
      </div>{' '}
      <div>
        <button className="btn" onClick={populate}>
          Populate randomly
        </button>
      </div>
    </div>
  );
};

export default Controls;
