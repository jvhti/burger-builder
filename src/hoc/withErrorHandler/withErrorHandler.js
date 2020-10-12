import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearErrorHandler] = useHttpErrorHandler(axios);

    return (
        <React.Fragment>
          <Modal show={!!error} modalClosed={clearErrorHandler}>
            {error ? error.message : null}
          </Modal>
          <WrappedComponent {...props}/>
        </React.Fragment>
    );
  };
};

export default withErrorHandler;
