import React from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.module.scss';
import Backdrop from "../Backdrop/Backdrop";

const modal = (props) => {
  return (
      <React.Fragment>
        <div className={classes.Modal}
             style={{
               transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
               opacity: props.show ? '1' : '0'
             }}>
          {props.children}
        </div>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
      </React.Fragment>
  );
};

modal.propTypes = {
  show: PropTypes.bool,
  modalClosed: PropTypes.func
};

export default React.memo(modal);
