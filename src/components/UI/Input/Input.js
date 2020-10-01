import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
  let inputElement;
  const filteredProps = (({inputType, ...filtered}) => filtered)(props);

  switch (props.inputType) {
    case ('input'):
      inputElement = <input {...filteredProps} className={classes.InputElement}/>;
      break;
    case ('textarea'):
      inputElement = <textarea {...filteredProps} className={classes.InputElement}/>;
      break;
    default:
      inputElement = <input {...filteredProps} className={classes.InputElement}/>
      break;
  }
  return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
      </div>
  );
};

export default input;
