import React from 'react';
import { SizeContext } from '../Contexts';

const Controls = () => {
  const { height, width, onResize, populateBoard, tickOnce, playPause, isPlaying } =
    React.useContext(SizeContext);
  const changeHandler = React.useCallback(
    (event) => {
      onResize({
        height,
        width,
        [event.target.id]: event.target.value,
      });
    },
    [height, width, onResize],
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
      <div className="actions">
        <button className="btn actions__btn" onClick={populateBoard}>
          Populate randomly
        </button>
        <button className="btn actions__btn" onClick={tickOnce}>
          Tick
        </button>
        <button className="btn actions__btn" onClick={playPause}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default Controls;
