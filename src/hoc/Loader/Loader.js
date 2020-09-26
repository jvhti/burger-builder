import React from 'react';
import Spinner from "../../components/UI/Spinner/Spinner";

const loader = (props) => {
  if (props.loading)
    return <Spinner/>;

  return props.children;
};

export default loader;
