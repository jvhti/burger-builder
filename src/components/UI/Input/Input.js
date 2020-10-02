import React from 'react';
import classes from './Input.module.scss';

const input = (props) => {
  let inputElement;

  switch (props.elementType) {
    case ('input'):
      inputElement = <input {...props.elementConfig} className={classes.InputElement} value={props.value}/>;
      break;
    case ('textarea'):
      inputElement = <textarea {...props.elementConfig} className={classes.InputElement} value={props.value}/>;
      break;
    case ('select'):
      inputElement = (
          <select className={classes.InputElement} value={props.value}>
            {props.elementConfig.options.map(option => <option key={option.value}
                                                               value={option.value}>{option.displayValue}</option>)}
          </select>
      );
      break;
    default:
      inputElement = <input {...props.elementConfig} className={classes.InputElement} value={props.value}/>
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
